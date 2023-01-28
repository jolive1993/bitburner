import * as scanService from "scan-service.js";

export async function main(ns) {
    let allServers = await scanService.ServersScan(ns, "home");
    await killallServers(ns, allServers);
}

async function killallServers(ns, allServers) {
    for await (let host of allServers) {
		ns.killall(host);
    }
}