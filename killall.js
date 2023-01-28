import * as lastRunService from "last-run-service.js";

export async function main(ns) {
	let sourceHost = ns.getHostname();
	let thisScriptName = ns.getScriptName()
	let lastRunLogFile = thisScriptName.replace(".js", ".txt")
	let hosts = ns.scan();

	if (!lastRunService.isReady(ns, lastRunLogFile, sourceHost)) {
		return;
	}

	ns.killall(sourceHost);

	for await (let host of hosts) {
			ns.killall(host, true);
			ns.exec(thisScriptName, host);
            lastRunService.writeLastRunTime(ns, thisScriptName);
    
	}
	
	lastRunService.writeLastRunTime(ns, lastRunLogFile);
}