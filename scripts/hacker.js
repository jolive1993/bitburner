/** @param {NS} ns */
export async function main(ns) {
	let host = ns.args[0];
	while (true) {
		let hackChance = ns.hackAnalyzeChance(host)
		let money = ns.getServerMoneyAvailable(host)
		if (money < 50000) {
			await ns.grow(host)
		}
		else if (hackChance < .75) {
			await ns.weaken(host);
		}
		else {
			await ns.hack(host);
		}
	}
}