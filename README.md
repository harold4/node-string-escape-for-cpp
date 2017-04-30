# String escape for c/++
========================

Escape the string that can be use in c/c++


## Installation

    npm install @harold4/string-escape-for-cpp

## Usage

#### grunt

	var escapeCpp = require('@harold4/string-escape-for-cpp');
	
	grunt.initConfig({
	    ...
	    copy: {
	        escape: {
	            src: 'dist/index.html', dest: 'dist/index.escaped.html', options: {process: escapeCpp}
	        }
	    },
	    ...
	});
	
	...
	grunt.loadNpmTasks('grunt-contrib-copy');
  
  
## Tests

  `npm test`

