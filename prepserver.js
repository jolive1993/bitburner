export async function main(ns) {
    let host = ns.args[0]
    if (!ns.hasRootAccess(host)) {
        try {
            ns.tprint(serverList[host] + "\n");
            ns.brutessh(host);
            ns.relaysmtp(host);
            ns.ftpcrack(host);
            ns.httpworm(host)
            ns.nuke(host);
        } catch {
        }
    }
}