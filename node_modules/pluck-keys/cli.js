#! /usr/bin/env node

var pluck = require('./index')

var data = ""
process.openStdin()

var args = process.argv.slice(2)
  , keys = args


process.stdin.on('data', function (chunk) {
	data += chunk
})

process.stdin.on('end', function () {
	var obj = JSON.parse(data)
	  , out
	  , map = pluck.bind(null, keys)

  if (Array.isArray(obj)) {
  	out = obj.map(map)
  } else {
  	out = map(obj)
  }
	console.log(out)
})