import * as scanService from "scan-service.js";

export async function main(ns) {
    let allServers = await scanService.ServersScan(ns, "home");
    let hackableServers = allServers.filter(x => ns.getServerMoneyAvailable(x) > 0 && !x.includes("purchased-server-") && ns.hasRootAccess(x));
    await hackServers(ns, allServers, hackableServers);
}

function* shuffle(arr) {
    arr = [...arr];
    while (arr.length) yield arr.splice(Math.random() * arr.length | 0, 1)[0]
}

async function hackServers(ns, allServers, hackableServers) {
    const hackScript = "hacker.js";
    const sourceHost = ns.getHostname();
    for await (let host of allServers) {
        let hackerRamCost = ns.getScriptRam(hackScript);
        let thisServer = ns.getServer(host);
        let files = ns.ls(sourceHost, ".js");
        if (!ns.hasRootAccess(host)) {
            try {
                if (ns.fileExists("BruteSSH.exe")) {
                    ns.brutessh(host);
                };
                if (ns.fileExists("relaySMTP.exe")) {
                    ns.relaysmtp(host);
                };
                if (ns.fileExists("FTPCrack.exe")) {
                    ns.ftpcrack(host);
                };
                if (ns.fileExists("HTTPWorm.exe")) {
                    ns.httpworm(host)
                };
                if (ns.fileExists("SQLInject.exe")) {
                    ns.sqlinject(host)
                };
                ns.nuke(host);
            } catch (e) {
                ns.tprint(`${host}: could not nuke ${e}} \n`)
            }
        }
        if (ns.hasRootAccess(host)) {
            ns.scp(files, host);
            let threads = Math.floor((thisServer.maxRam - ns.getServerUsedRam(host)) / hackerRamCost)
            ns.tprint(`${host} ${threads}`)
            if (threads <= 0) {
                continue;
            }
            ns.exec(hackScript, host, threads, hackableServers.includes(host) ? host : [...shuffle(hackableServers)][0]);
        }
    }
}