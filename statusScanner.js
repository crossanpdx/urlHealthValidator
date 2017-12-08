var links = [];
var fs = require('fs');
var utils = require('utils');
var http = require('http');

var casper = require('casper').create({
  httpStatusHandlers: {
    404: function(self, resource){
      self.echo(resource.url + '\n>> Not found (404)', 'RED_BAR')
    },
    500: function(self, resource){
      self.echo(resource.url + '\n>> Internal server error (500)', 'RED_BAR')
    },
    200: function(self, resource){
      self.echo(resource.url + '\n>> OK (200)', 'GREEN_BAR')
    }
  },
  verbose: true
});

casper.start();

casper.then(function() {
      var i = 0;

      urlFile = fs.open(this.cli.get('filename'), 'r');
      line = urlFile.readLine();

      // This imports data from file into an array
      while(line) {
        links[i] = line;
        line = urlFile.readLine();
        i++;
      }

      urlFile.close();
});

casper.then(function() {
  var currentTime = new Date();
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  var path = '.\\logs\\results-'+year + '-' + month + '-' + day + '.txt';

  this.each(links, function(self, link) {
    self.thenOpen((link), function(response) {
      console.log('REPORTING STATUS: ' + response.status + '\nFROM: ' + link);

      var statusReport = 'REPORTING STATUS: ' + response.status + '\nFROM: ' + link + '\n';
      try{
        fs.write(path, statusReport, 'a');
      } catch(error){
        console.log(error);
      }
    });
  });
});

casper.run(function() {
  this.echo('\n### STATUS SCANNER DONE ###').exit();
});
