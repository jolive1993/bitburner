import * as lastRunService from "last-run-service.js";

export async function main(ns) {
    let sourceHost = ns.getHostname();
    let hosts = ns.scan().filter(x => x !== "home");

    for await (let host of hosts) {
        if (!ns.hasRootAccess(host)) {
            try{
                ns.brutessh(host);
                ns.relaysmtp(host);
                ns.ftpcrack(host);
                ns.httpworm(host)
                ns.nuke(host);
            } catch{
            }
        }
    }
    //ns.alert(`${sourceHost} - ${thisScriptName}: Did run: true`);

}