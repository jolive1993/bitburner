import * as scanService from "scan-service.js";

export async function main(ns) {
    let sourceHost = ns.getHostname();
    let hosts = await scanService.ServersScan(ns, "home");
    let files = ns.ls(sourceHost, ".js");

    for await (let host of hosts) {
        if (ns.hasRootAccess(host)) {
            ns.scp(files, host);
        }
    }

}