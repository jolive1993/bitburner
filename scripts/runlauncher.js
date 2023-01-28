import * as lastRunService from "last-run-service.js";

export async function main(ns) {
	let sourceHost = ns.getHostname();
	let hosts = ns.scan(sourceHost);
	let thisScriptName = ns.getScriptName()

	if (!lastRunService.isReady(ns, thisScriptName, sourceHost)) {
		//ns.alert(`${sourceHost} - ${thisScriptName}: Did run: false`);
		return;
	}

	for await (let host of hosts) {
		if (ns.hasRootAccess(host)) {
			ns.exec("launcher.js", host);
		
		}
	}
	lastRunService.writeLastRunTime(ns, thisScriptName);
	//ns.exec("launcher.js", sourceHost);
	//ns.alert(`${sourceHost} - ${thisScriptName}: Did run: true`);
}