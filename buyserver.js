export async function main(ns) {
    const serverName = "purchased-server-"
    let serverRamArg = ns.args[0] ?? 1048576;
    let serverLimit = ns.getPurchasedServerLimit();
    let serverCost = ns.getPurchasedServerCost(serverRamArg)
    let player = ns.getPlayer();
    let purchasedServers = ns.getPurchasedServers();

    ns.print(player.money);
    ns.print(purchasedServers);
    ns.print(serverLimit);
    ns.print(serverCost);
    ns.print(purchasedServers.length);

    while(player.money > serverCost && serverLimit > purchasedServers.length){
        ns.purchaseServer(`${serverName}${purchasedServers.length}`, serverRamArg)
        player = ns.getPlayer();
        purchasedServers = ns.getPurchasedServers();
    }
        for await (let host of purchasedServers) {
            let upgradeCost = ns.getPurchasedServerUpgradeCost(host, serverRamArg)
            ns.print(`${host} upgrade cost : ${upgradeCost}`);
            if(player.money > upgradeCost){
                ns.upgradePurchasedServer(host, serverRamArg)
                player = ns.getPlayer();
            }
        }
    
    }