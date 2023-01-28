import * as lastRunService from "last-run-service.js";

export async function main(ns) {
	const hackScript = "hacker.js";
	const sourceHost = ns.getHostname();
	let hackerRamCost = ns.getScriptRam(hackScript);
	let hosts = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sush", "iron-gym"];
	let thisServer = ns.getServer(sourceHost);
	let thisScriptName = ns.getScriptName();
	let thisScriptRamCost = ns.getScriptRam(thisScriptName);

	if (!lastRunService.isReady(ns, thisScriptName, sourceHost)) {
		//ns.alert(`${sourceHost} - ${thisScriptName}: Did run: false`);
		return;
	}

	while (thisServer.maxRam - ns.getServerUsedRam(sourceHost) - thisScriptRamCost > hackerRamCost) {
		for await (let host of hosts) {
			try {
				await ns.exec(hackScript, host)
			} catch {

			}
		}
	}
	lastRunService.writeLastRunTime(ns, thisScriptName);
	//ns.alert(`${sourceHost} - ${thisScriptName}: Did run: true`);
}