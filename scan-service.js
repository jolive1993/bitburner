export async function ServersScan(ns, target) {
    let serverChecked = [];
    let checkList = [];
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
    serverChecked = serverChecked.filter(x => x !== "home");
    return serverChecked;
}