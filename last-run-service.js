export function isReady(ns, scriptName, sourceHost) {
	let fileName = scriptName.replace(".js", ".txt");
	if (ns.fileExists(fileName, sourceHost)) {
		let lastRun = JSON.parse(ns.read(fileName)).lastRun;
		let now = new Date;
		now = now.getTime() / 1000;
		let timeDiff = now - lastRun
		if (timeDiff <= 2) {
			return false;
		}
	};
	return true;
}

export function writeLastRunTime(ns, scriptName) {
	let fileName = scriptName.replace(".js", ".txt");
	ns.write(fileName, `{"lastRun": "${new Date().getTime() / 1000}"}`, "w");
}