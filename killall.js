import * as lastRunService from "last-run-service.js";

export async function main(ns) {
	let sourceHost = ns.getHostname();
	let hosts = ns.scan(sourceHost);
	let thisScriptName = ns.getScriptName()
	let lastRunLogFile = thisScriptName.replace(".js", ".txt")

	if (!lastRunService.isReady(ns, lastRunLogFile, sourceHost)) {
		return;
	}

	for await (let host of hosts) {
		if (ns.hasRootAccess(host)) {
			ns.killall(host);
		}
	}
	
	lastRunService.writeLastRunTime(ns, lastRunLogFile);
}