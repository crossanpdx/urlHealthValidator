//var casper = require('casper').create();
var links = [];

casper.start();

casper.then(function() {
      var fs = require('fs');
      var i = 0;

      urlFile = fs.open(casper.cli.get('filename'), 'r');
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
    var i = -1;
  // Loop on array
  casper.each(links, function(self, link) {
    i++
    self.thenOpen((link + links[i]), function(response) {
      utils.dump(response.status);
      if (response == undefined|| response.status >= 400) this.echo("FAIL", 'RED_BAR');
    });
  });
});

casper.on('http.status.500', function(resource) {
  this.echo('This url is 500: ' + resource.url, 'RED_BAR');
});

casper.on('http.status.200', function(resource) {
  this.echo('This url is 200: ' + resource.url, 'GREEN_BAR')
});

casper.run(function() {
  casper.exit();
});
