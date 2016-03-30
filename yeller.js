module.exports.colors = {
	RESET:"\x1b[0m",
	NOCOLOR:"\x1b[0m",
	BOLD:"\x1b[1m",
	DIM:"\x1b[2m",
	UNDERLINED:"\x1b[4m",
	BLINK:"\x1b[5m",
	REVERSE:"\x1b[7m",
	HIDDEN:"\x1b[8m",
	BLACK:"\x1b[30m",
	RED:"\x1b[31m",
	GREEN:"\x1b[32m",
	YELLOW:"\x1b[33m",
	BLUE:"\x1b[34m",
	MAGENTA:"\x1b[35m",
	CYAN:"\x1b[36m",
	LTGRAY:"\x1b[37m",
	GRAY:"\x1b[90m",
	LTRED:"\x1b[91m",
	LTGREEN:"\x1b[92m",
	LTYELLOW:"\x1b[93m",
	LTBLUE:"\x1b[94m",
	LTMAGENTA:"\x1b[95m",
	LTCYAN:"\x1b[96m",
	WHITE:"\x1b[97m",
	BGBLACK:"\x1b[40m",
	BGRED:"\x1b[41m",
	BGGREEN:"\x1b[42m",
	BGYELLOW:"\x1b[43m",
	BGBLUE:"\x1b[44m",
	BGMAGENTA:"\x1b[45m",
	BGCYAN:"\x1b[46m",
	BGLTGRAY:"\x1b[47m",
	BGGRAY:"\x1b[100m",
	BGLTRED:"\x1b[101m",
	BGLTGREEN:"\x1b[102m",
	BGLTYELLOW:"\x1b[103m",
	BGLTBLUE:"\x1b[104m",
	BGLTMAGENTA:"\x1b[105m",
	BGLTCYAN:"\x1b[106m",
	BGWHITE:"\x1b[107m"
};

var c = module.exports.colors;

module.exports.emergency=function(msg,showLineInfo){
	printMessage(c.BLINK+c.BGLTRED+c.BOLD+c.WHITE," EMERGENCY ",msg, typeof showLineInfo === 'boolean'?showLineInfo:true);
}
module.exports.alert=function(msg,showLineInfo){
	printMessage(c.BGRED+c.BOLD+c.LTGRAY," ALERT ",msg, typeof showLineInfo === 'boolean'?showLineInfo:true);
}
module.exports.critical=function(msg,showLineInfo){
	printMessage(c.BOLD+c.LTRED,"CRITICAL",msg, typeof showLineInfo === 'boolean'?showLineInfo:true);
}
module.exports.error=function(msg,showLineInfo){
	printMessage(c.RED+c.BOLD,"ERROR",msg, typeof showLineInfo === 'boolean'?showLineInfo:true);
}
module.exports.warn=function(msg,showLineInfo){
	printMessage(c.BGGRAY+c.BOLD+c.LTYELLOW," WARNING ",msg, typeof showLineInfo === 'boolean'?showLineInfo:true);
}
module.exports.notice=function(msg,showLineInfo){
	printMessage(c.BGBLUE+c.BOLD+c.WHITE," NOTICE ",msg, typeof showLineInfo === 'boolean'?showLineInfo:true);
}
module.exports.info=function(msg,showLineInfo){
	printMessage(c.GREEN+c.BOLD,"INFO",msg, typeof showLineInfo === 'boolean'?showLineInfo:true);
}
module.exports.debug=function(msg,showLineInfo){
	printMessage(c.BLUE+c.BOLD+c.BGLTGRAY," DEBUG ",msg, typeof showLineInfo === 'boolean'?showLineInfo:true);
}

module.exports.custom = function(color,heading,msg,showLineInfo){
	printMessage(color,heading,msg,showLineInfo);
}

module.exports.log = function(obj){
	printMessage(
		obj.color ? c[obj.color] : c.GREEN,
		obj.heading || "LOG",
		obj.msg || "",
		obj.showLineInfo || true
	);
}

var loggerError = function(msg){
	var info = getInfo(1);
	var lineInfo = c.CYAN + " (" + info.file + ":" + info.line + ")";
	console.log(c.RED + "LOGGER ERROR" + lineInfo + ": " + c.RESET + msg);
}

function convertMessage(msg){
	if(typeof msg == 'object'){
		msg = JSON.stringify(msg,null,'\t');
		msg = msg.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
				var cls = 'CYAN';
				if (/^"/.test(match)) {
						if (/:$/.test(match)) {
								cls = 'RED'; //KEY
						} else {
								cls = 'GREEN'; //STRING
						}
				} else if (/true|false/.test(match)) {
						cls = 'YELLOW'; //BOOLEAN
				} else if (/null|undefined/.test(match)) {
						cls = 'GRAY'; //NULL
				}

				return c[cls] + match + c.RESET;
		});
		msg = msg.replace(/\n/g,"\n\t");
		msg = c.YELLOW + "OBJECT:\n\t" + c.RESET + msg;
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
		msgInfo += ": " + c.RESET + convertMessage(msg);
	}
	else{
		msgInfo += c.RESET;
	}
	var lineInfo = "";
	if(showLineInfo){
		var date = new Date();
		var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		var info = getInfo(1);
		if(info.file.indexOf('/yeller/yeller.js') >= 0){
			info = getInfo(2);
		}
		lineInfo += c.RESET + c.CYAN + " (" + info.file + ":" + info.line + " - " + dateString + ")";
	}
	console.log(color + heading + lineInfo + msgInfo);
}
