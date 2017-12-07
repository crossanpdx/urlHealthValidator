var links = [];

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
      var fs = require('fs');
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
    var utils = require('utils');
    var http = require('http');

  this.each(links, function(self, link) {
    self.thenOpen((link), function(response) {
      console.log('REPORTING STATUS: ' + response.status + '\nFROM: ' + link);
      var path = 'log.txt';
      var data = 'REPORTING STATUS: ' + response.status + '\nFROM: ' + link;
      fs.write(path, data, 'w');
    });
  });
});

casper.run(function() {
  this.echo('\n### STATUS SCANNER DONE ###').exit();
});
