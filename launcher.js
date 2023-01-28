import * as lastRunService from "last-run-service.js";

export async function main(ns) {
	const hackScript = "hacker.js";
	const sourceHost = ns.getHostname();
	const hackerRamCost = ns.getScriptRam(hackScript);
	const thisServer = ns.getServer(sourceHost);

	let hosts = ns.scan(sourceHost);

	hosts.unshift(sourceHost);
	hosts = hosts.filter(x => x !== "home");

	let threads = Math.floor((thisServer.maxRam - ns.getServerUsedRam(sourceHost)) / hackerRamCost)
	ns.exec(hackScript, sourceHost, threads, hosts[0]);
}