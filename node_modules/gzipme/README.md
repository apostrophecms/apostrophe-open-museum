## Build Status

[![Build Status](https://travis-ci.org/caio-ribeiro-pereira/gzipme.png?branch=master)](https://travis-ci.org/caio-ribeiro-pereira/gzipme) [![Dependency Status](https://gemnasium.com/caio-ribeiro-pereira/gzipme.png)](https://gemnasium.com/caio-ribeiro-pereira/gzipme)

## About
A simple Node module and CLI tools which gzip files for you! :)

It's very simple to use it, just follow the documentation below...

Now has full ES6 support! It only works with Node.js 6.0 or using [Babel Transpiler](https://babeljs.io).

## Module Version
### Instalation

``` bash
npm install gzipme
```

### The code
``` javascript
import gzipme from 'gzipme'

// Compress "file.txt" to "file.txt.gz" in the same dir.
gzipme("file.txt");

// Compress "file.txt" and overwrite it to "file.txt" in the same dir.
gzipme("file.txt", true);

// Compress "file.txt" to specified file "compressed.txt" in the same dir.
gzipme("file.txt", "compressed.txt");

// Compress "file.txt" using best compress mode (few bytes, but slow compression).
gzipme("file.txt", false, "best");

// Compress "file.txt" using fast compress mode (fast compression, but more bytes).
gzipme("file.txt", false, "fast");
```

[Click here](http://nodejs.org/api/zlib.html#zlib_constants) to understand the Node.js Zlib compreension mode.


## CLI Version
### Instalation

``` bash
npm install -g gzipme
```

### The Commands

``` bash
# It's the same as function 'gzipme("file.txt")'.
gzipme file.txt
# It's the same as function 'gzipme("file.txt", true)'.
gzipme -o file.txt
# It's the same as function 'gzipme("file.txt", "compressed.txt")'.
gzipme -O compressed.txt file.txt
# It's the same as function 'gzipme("file.txt", false, "best")'.
gzipme -c best file.txt
# It's the same as function 'gzipme("file.txt", false, "fast")'.
gzipme -c fast file.txt
```

## Running tests

Just clone this repository, and follow the commands below:
``` bash
git clone git@github.com:caio-ribeiro-pereira/gzipme.git
cd gzipme
npm install
npm test
```

## Author

Caio Ribeiro Pereira <caio.ribeiro.pereira@gmail.com>

Twitter: <http://twitter.com/crp_underground>

Blog: <https://udgwebdev.com>

## TODO
+ Decompress a gzip file
+ Compress full directories and subdirectories
+ Compress and Decompress in async function

And new ideas are welcome here!

## License

The MIT License (MIT)

Copyright (c) 2016 caio.ribeiro.pereira@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
