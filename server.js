/**
 * Git Auto Pull Script
 * 
 * Work originated by github.com/Keenpoint
 * Original script https://github.com/Keenpoint/git-auto-pull/blob/master/git-auto-pull.js
 * 
 * @author: JohnnyHuy
 */

const http = require("http");
const exec = require("child_process").exec;
const path = require("path");
const async = require("async");

const projectPath = process.argv[2];
const absolutePath = path.join(__dirname, projectPath);

const cmds = ["git pull"].concat(process.argv.filter((arg, index) => { return index > 2; }));

const execCmds = cmds.map((cmd) => {
	return function(callback) {
		exec(`cd ${absolutePath} && ${cmd}`, {maxBuffer: 1024 * 600}, (err, stdout, stderr) => {
			if (err) return callback(err);
			callback(null, `--- ${cmd} ---:\n stdout: ${stdout} \n stderr: ${stderr}\n`);
		});
	};
});

const updateProject = function(callback) {
	async.series(
		execCmds
	, function(err, results) {
		if (err) return callback(err);
		return callback(null, results.join(""));
	});
};

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    console.log("ALERT: Event detected, starting execution...")

	updateProject((e, result) => {
		let response = "";
	    if (e) {
	    	console.error(`exec error: ${e}`);
	    	response += `exec error: ${e}`;
	    }
	    if (result) {
	    	console.log(result);
	    	response += `\n ${result}`;
	    }
		res.end(response);
	});

}).listen(3000);
console.log("ALERT: Git Auto Pull is currently running...");
