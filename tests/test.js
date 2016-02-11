var yeller = require("../yeller");

yeller.custom(yeller.colors.CYAN,"CUSTOM","This is a custom message",false)
yeller.custom(yeller.colors.CYAN,"CUSTOM","This is a custom message with line info",true)
yeller.custom(yeller.colors.RED,"****CUSTOM HEADING AND NOTHING ELSE****")
yeller.custom(yeller.colors.UNKNOWNCOLOR,"INCORRECT COLOR")
console.log("This is here to show the color gets reset correctly")
yeller.info("This is some info")
yeller.warn("This is a warning")
yeller.error("This is an error")
yeller.debug("This is a debug statement")
yeller.custom(yeller.colors.RED)
