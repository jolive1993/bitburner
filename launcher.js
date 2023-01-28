import * as lastRunService from "last-run-service.js";

export async function main(ns) {

	function* shuffle(arr) {
		arr = [...arr];
		while(arr.length) yield arr.splice(Math.random()*arr.length|0, 1)[0]
	  }

	const hackScript = "hacker.js";
	const sourceHost = ns.getHostname();
	const hackerRamCost = ns.getScriptRam(hackScript);
	const thisServer = ns.getServer(sourceHost);

	let hosts = ns.scan(sourceHost);
	hosts.unshift(sourceHost);
	hosts = hosts.filter(x => x !== "home" && !x.includes("purchased-server-"));
	if(hosts.length < 1){
		hosts = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym"]
		hosts = [...shuffle(hosts)]
	}
	let threads = Math.floor((thisServer.maxRam - ns.getServerUsedRam(sourceHost)) / hackerRamCost)
	if(threads <= 0){
		ns.alert(`${sourceHost} could not hack, not enough ram for a single thread.`);
		return;
	}
	ns.exec(hackScript, sourceHost, threads, hosts[0]);
}