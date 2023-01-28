import * as scanService from "scan-service.js";

export async function main(ns) {
    let allServers = await scanService.ServersScan(ns, "home");
    let hackableServers = allServers.filter(x => ns.getServerMoneyAvailable(x) > 0 && !x.includes("purchased-server-") && ns.hasRootAccess(x));
    await hackServers(ns, allServers, hackableServers);
}

function* shuffle(arr) {
    arr = [...arr];
    while(arr.length) yield arr.splice(Math.random()*arr.length|0, 1)[0]
  }

async function hackServers(ns, allServers, hackableServers) {
    const hackScript = "hacker.js";
    for await (let host of allServers) {
        let hackerRamCost = ns.getScriptRam(hackScript);
        let thisServer = ns.getServer(host);
        if (ns.hasRootAccess(host)) {
            let threads = Math.floor((thisServer.maxRam - ns.getServerUsedRam(host)) / hackerRamCost)
            if (threads <= 0) {
                ns.alert(`${host} could not hack, not enough ram for a single thread.`);
                continue;
            }
            ns.exec(hackScript, host, threads, hackableServers.includes(host) ? host : [...shuffle(hackableServers)][0]);
        } else {
            try {
                ns.exec("prepserver.js", host);
            } catch {

            }
        }
    }
}