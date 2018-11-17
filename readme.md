# urlHealthChecker

HTTP Status checker script to read in urls from a file and check each url in list of the site http status. This is to verify if a site is healthy.

## Getting Started

1. Can be executed by Jenkins or locally with command line interface.
2. Git clone the project and install prerequisites.

### Prerequisites

1. brew install phantomjs
2. brew install casperjs

### Installing

1. git clone the project
2. Install prerequisites
3. cd to work directory
4. Verify phantomjs setup (phantomjs --version)
5. Verify casperjs setup (casperjs --version)

## Running the tests

- Jenkins or locally.

- Command line format to pass filename:

**casperjs test statusScanner.js --filename=<path to file>**
# urlHealthValidator
