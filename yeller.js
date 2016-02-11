module.exports.colors = {
	RED:"\x1b[31m",
	GREEN:"\x1b[32m",
	YELLOW:"\x1b[33m",
	CYAN:"\x1b[36m",
	RESET:"\x1b[0m"
};

module.exports.custom = function(color,heading,msg,showLineInfo){
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
		msgInfo += ": " + this.colors.RESET + convertMessage(msg);
	}
	else{
		msgInfo += this.colors.RESET;
	}
	var lineInfo = "";
	if(showLineInfo){
		var info = getInfo(1);
		if(info.file.indexOf('/yeller/yeller.js') >= 0){
			info = getInfo(2);
		}
		lineInfo += this.colors.CYAN + " (" + info.file + ":" + info.line + ")";
	}
	console.log(color + heading + lineInfo + msgInfo);
}

module.exports.info = function(msg){
	this.custom(this.colors.GREEN,"INFO",msg,true);
}

module.exports.warn = function(msg){
	this.custom(this.colors.YELLOW,"WARN",msg,true);
}

module.exports.error = function(msg){
	this.custom(this.colors.RED,"ERROR",msg,true);
}

module.exports.debug = function(msg){
	this.custom(this.colors.RED,"DEBUG",msg,true);
}

var loggerError = function(msg){
	var info = getInfo(1);
	var lineInfo = module.exports.colors.CYAN + " (" + info.file + ":" + info.line + ")";
	console.log(module.exports.colors.RED + "LOGGER ERROR" + lineInfo + ": " + module.exports.colors.RESET + msg);
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
