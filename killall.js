import * as scanService from "scan-service.js";

export async function main(ns) {
    let serverChecked = await scanService.ServersScan(ns, "home");
    let hackableServers = serverChecked.filter(x => ns.getServerMoneyAvailable(x) > 0 && !x.includes("purchased-server-") && ns.hasRootAccess(x));
    await hackServers(ns, serverChecked, hackableServers);
}

async function hackServers(ns, serverList, hackableServers) {
    for await (let host of serverList) {
		ns.killall(host);
    }
}