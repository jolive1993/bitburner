let serverChecked = [];
let checkList = [];
export async function main(ns) {
    await ServersScan(ns, 'home');
    serverChecked = serverChecked.filter(x => x !== "home");
    let hackableServers = serverChecked.filter(x => ns.getServerMoneyAvailable(x) > 0 && !x.includes("purchased-server-") && ns.hasRootAccess(x));
    await hackServers(ns, serverChecked, hackableServers);
    //await printArray(ns, serverChecked);
}
export async function ServersScan(ns, target) {
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