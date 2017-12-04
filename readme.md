# urlHealthChecker

HTTP Status checker script to read in urls from a file and check each url in list of the site http status. This is to verify if a site is healthy.

## Getting Started

Can be executed by Jenkins or locally with command line interface.
Git clone the project and install prerequisites.

### Prerequisites

brew install phantomjs
brew install casperjs

### Installing

git clone the project
install prerequisites
cd to work directory
verify phantomjs setup (phantomjs --version)
verify casperjs setup (casperjs --version)

## Running the tests

Jenkins or locally.

Command line format to pass filename:

casperjs test statusScanner.js --filename=<path to file>
