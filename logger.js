var RED = "\x1b[31m";
var GREEN = "\x1b[32m";
var YELLOW = "\x1b[33m";
var CYAN = "\x1b[36m";
var RESET = "\x1b[0m";

module.exports.info = function(msg){
	msg = convertMessage(msg);
	var info = getInfo();
	console.log(GREEN + "INFO " + CYAN + "(" + info.file + ":" + info.line + "): " + RESET + msg);
}

module.exports.warn = function(msg){
	msg = convertMessage(msg);
	var info = getInfo();
	console.log(YELLOW + "WARN " + CYAN + "(" + info.file + ":" + info.line + "): " + RESET + msg);
}

module.exports.error = function(msg){
	msg = convertMessage(msg);
	var info = getInfo();
	console.log(RED + "ERROR " + CYAN + "(" + info.file + ":" + info.line + "): " + RESET + msg);
}

module.exports.debug = function(msg){
	msg = convertMessage(msg);
	var info = getInfo();
	console.log(RED + "DEBUG " + CYAN + "(" + info.file + ":" + info.line + "): " + RESET + msg);
}

function convertMessage(msg){
	if(typeof msg == 'object'){
		msg = JSON.stringify(msg);
	}
	return msg;
}

function getInfo(){
	var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return {
    	line:stack[1].getLineNumber(),
    	file:stack[1].getFileName()
    }
}
