let serverChecked = [];
let checkList = [];
export async function main(ns) {
    await ServersScan(ns, 'home');
    serverChecked = serverChecked.filter(x => x !== "home");
    let hackableServers = serverChecked.filter(x => ns.getServerMoneyAvailable(x) > 0 && !x.includes("purchased-server-") && ns.hasRootAccess(x));
    await hackServers(ns, serverChecked, hackableServers);
    //await printArray(ns, serverChecked);
}
function* shuffle(arr) {
    arr = [...arr];
    while(arr.length) yield arr.splice(Math.random()*arr.length|0, 1)[0]
  }

async function ServersScan(ns, target) {
    var servers1 = await ns.scan(target);
    for (var server in servers1) {
        if (!checkList.includes(servers1[server])) {
            checkList.push(servers1[server]);
        }
    }
    serverChecked.push(target);
    var flag = true;
    while (flag) {
        flag = false;
        for (var i = 0; i < checkList.length; i++) {
            var servers = await ns.scan(checkList[i]);
            if (!serverChecked.includes(checkList[i])) {
                serverChecked.push(checkList[i]);
            }
            for (var server in servers) {
                if (!checkList.includes(servers[server])) {
                    checkList.push(servers[server]);
                }
            }
        }
    }
}
 async function printArray(ns, serverList) {
    for await (let server of serverList) {
        ns.print(server + "\n");
        ns.tprint(server + "\n");
    }
}

async function hackServers(ns, serverList, hackableServers) {
    const hackScript = "hacker.js";
    for await (let host of serverList) {
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