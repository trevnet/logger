# Yeller

### Installation
```
npm install yeller
```
### Usage

```javascript
var yeller = require("../yeller");

//Log Levels
yeller.emergency("This is an emergency")
yeller.alert("This is an alert")
yeller.critical("This is an critical error")
yeller.error("This is an error")
yeller.warn("This is a warning")
yeller.notice("This is a notice")
yeller.info("This is some info")
yeller.debug("This is a debug statement")

//Custom yells with an object
yeller.log({msg:"Hi There"}) //defaults to green heading of LOG and shows line info
yeller.log({
	color:yeller.colors.RED+yeller.colors.BOLD,
	heading:"GO AWAY",
	msg:"you are not welcome here",
	showLineInfo:false
})
yeller.log({
	color:yeller.colors.NOCOLOR,
	heading:"I'm a bland message", //Use header when doing one liners
	showLineInfo:true
})

//Pretty Prints Objects
yeller.debug({"This is":"an object I'd like","to see":"pretty printed","with":['nested arrays',{"and":"objects",its:true},"I'm too cool",4,null]})
yeller.info(["This is",null,{an:"array",with:"showLineInfo",setTo:false},4, "example"],false);

//Logs functions as strings
yeller.debug(function(something){ return something; })
yeller.debug(yeller.debug)

//Formatting Options (BOLD,BLINK,INVERTED,UNDERLINED,BACKGROUND COLORS,ETC)
yeller.custom(yeller.colors.BGGRAY+yeller.colors.RED+yeller.colors.UNDERLINED,"Not Bold Heading","Not Bold",true) //gray background, red underlined text
yeller.custom(yeller.colors.BOLD+yeller.colors.BLINK+yeller.colors.LTRED,"Bold Heading","Bold",true) //bold, blinking, light red text (Note Blink only works on certain terminals)

//Custom Yells (Depricated)
yeller.custom(yeller.colors.CYAN,"CUSTOM","This is a custom message without line info",false)
yeller.custom(yeller.colors.CYAN,"CustomHeading","This is a custom message with line info",true)
yeller.custom(yeller.colors.RED,"****CUSTOM HEADING AND NOTHING ELSE****")
yeller.custom(yeller.colors.UNKNOWNCOLOR,"INCORRECT COLOR") // throws error expects color from yeller.colors
```
