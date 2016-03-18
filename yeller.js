module.exports.colors = {
	RED:"\x1b[31m",
	GREEN:"\x1b[32m",
	YELLOW:"\x1b[33m",
	CYAN:"\x1b[36m",
	RESET:"\x1b[0m"
};

var colors = module.exports.colors;

module.exports.custom = function(color,heading,msg,showLineInfo){
	printMessage(color,heading,msg,showLineInfo);
}

module.exports.info = function(msg){
	printMessage(colors.GREEN,"INFO",msg,true);
}

module.exports.warn = function(msg){
	printMessage(colors.YELLOW,"WARN",msg,true);
}

module.exports.error = function(msg){
	printMessage(colors.RED,"ERROR",msg,true);
}

module.exports.debug = function(msg){
	printMessage(colors.RED,"DEBUG",msg,true);
}

var loggerError = function(msg){
	var info = getInfo(1);
	var lineInfo = colors.CYAN + " (" + info.file + ":" + info.line + ")";
	console.log(colors.RED + "LOGGER ERROR" + lineInfo + ": " + colors.RESET + msg);
}

function convertMessage(msg){
	if(typeof msg == 'object'){
		msg = JSON.stringify(msg);
	}
	return msg;
}

function getInfo(lineNumber){
	var orig = Error.prepareStackTrace;
	Error.prepareStackTrace = function(_, stack){ return stack; };
	var err = new Error;
	Error.captureStackTrace(err, arguments.callee);
	var stack = err.stack;
	Error.prepareStackTrace = orig;
	return {
		line:stack[lineNumber].getLineNumber(),
		file:stack[lineNumber].getFileName()
	}
}

function printMessage(color,heading,msg,showLineInfo){
	if(!color){
		loggerError("A valid color is required!");
		return;
	}
	if(!heading){
		loggerError("'heading' is required!");
		return;
	}
	var msgInfo = "";
	if(msg){
		msgInfo += ": " + colors.RESET + convertMessage(msg);
	}
	else{
		msgInfo += colors.RESET;
	}
	var lineInfo = "";
	if(showLineInfo){
		var date = new Date();
		var dateString = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		var info = getInfo(1);
		if(info.file.indexOf('/yeller/yeller.js') >= 0){
			info = getInfo(2);
		}
		lineInfo += colors.CYAN + " (" + info.file + ":" + info.line + " - " + dateString + ")";
	}
	console.log(color + heading + lineInfo + msgInfo);
}
