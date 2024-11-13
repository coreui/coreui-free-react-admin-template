## xpath.js
An xpath module for node, written in pure javascript.

Originally written by Cameron McCormack ([blog](http://mcc.id.au/xpathjs)). 

Prepared as a node module by Yaron Naveh ([blog](http://webservices20.blogspot.com/), [twitter](https://twitter.com/YaronNaveh)).

## Install
Install with [npm](http://github.com/isaacs/npm):

    npm install xpath.js



xpath.js is xml engine agnostic but I recommend to use [xmldom](https://github.com/jindw/xmldom):

    npm install xmldom


## Your first xpath:
`````javascript
	var select = require('xpath.js')
	  , dom = require('xmldom').DOMParser

	var xml = "<book><title>Harry Potter</title></book>"
	var doc = new dom().parseFromString(xml)    
	var nodes = select(doc, "//title")
	console.log(nodes[0].localName + ": " + nodes[0].firstChild.data)
	console.log("node: " + nodes[0].toString())
`````
-->

	title: Harry Potter
	Node: <title>Harry Potter</title>

## Get text values directly
`````javascript 
    var xml = "<book><title>Harry Potter</title></book>"
    var doc = new dom().parseFromString(xml)    
    var title = select(doc, "//title/text()")[0].data   
    console.log(title)
`````  
-->
    
    Harry Potter

## Namespaces
`````javascript  
	var xml = "<book><title xmlns='myns'>Harry Potter</title></book>"
    var doc = new dom().parseFromString(xml)    
    var node = select(doc, "//*[local-name(.)='title' and namespace-uri(.)='myns/']")[0]
    console.log(node.namespaceURI)
`````
-->
    
    myns
	
## Attributes
`````javascript  
    var xml = "<book author='J. K. Rowling'><title>Harry Potter</title></book>"
    var doc = new dom().parseFromString(xml)    
    var author = select(doc, "/book/@author")[0].value    
    console.log(author)
`````
-->
    
    J. K. Rowling

## License
MIT
