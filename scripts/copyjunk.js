import * as lastRunService from "last-run-service.js";

export async function main(ns) {
    let sourceHost = ns.getHostname();
    let hosts = ns.scan().filter(x => x !== "home");
    let files = ns.ls(sourceHost, ".js");
    let thisScriptName = ns.getScriptName()

    if (!lastRunService.isReady(ns, thisScriptName, sourceHost)) {
        //ns.alert(`${sourceHost} - ${thisScriptName}: Did run: false`);
        return;
    }

    ns.killall(sourceHost, true);

    for await (let host of hosts) {
        if (ns.hasRootAccess(host)) {
            ns.killall(host, true);
            ns.scp(files, host);
            ns.exec("prepserver.js", host);
            ns.exec("runlauncher.js", host);
            lastRunService.writeLastRunTime(ns, thisScriptName);
            ns.exec(thisScriptName, host);
        }
    }
    //ns.alert(`${sourceHost} - ${thisScriptName}: Did run: true`);

}