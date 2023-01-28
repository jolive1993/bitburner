export async function main(ns) {
    const serverName = "purchased-server-"
    let serverRamArg = ns.args[0];
    let serverLimit = ns.getPurchasedServerLimit();
    let serverCost = ns.getPurchasedServerCost(serverRamArg)
    let player = ns.getPlayer();
    let purchasedServers = ns.getPurchasedServers();

    while(player.money > serverCost && serverLimit > purchasedServers.length - 1){
        ns.purchaseServer(`${serverName}${purchasedServers.length}`, serverRamArg)
        player = ns.getPlayer();
        purchasedServers = ns.getPurchasedServers();
    }

    ns.print(serverLimit);
    ns.print(serverCost);
}