export async function main(ns) {
    await hackServers(ns, ns.args[0]);
}

async function hackServers(ns, host) {
    const hackScript = "hacker.js";
    const sourcehost = ns.getHostname();
    let hackerRamCost = ns.getScriptRam(hackScript);
    let thisServer = ns.getServer(sourcehost);
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
        let threads = Math.floor((thisServer.maxRam - ns.getServerUsedRam(sourcehost)) / hackerRamCost)
        ns.tprint(`${host} ${threads}`)
        if (threads <= 0) {
        }
        ns.exec(hackScript, sourcehost, threads, host);
    }

}