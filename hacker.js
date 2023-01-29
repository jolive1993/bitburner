/** @param {NS} ns */
export async function main(ns) {
	let host = ns.args[0];
	while (true) {
		let money = ns.getServerMoneyAvailable(host)
		let scurityLevel = ns.getServerSecurityLevel(host);
		let minSecurityLevel = ns.getServerMinSecurityLevel(host);
		let maxMoney = ns.getServerMaxMoney(host);

		if (money < maxMoney) {
			await ns.grow(host)
		}
		else if ((minSecurityLevel * 1.15) < scurityLevel) {
			await ns.weaken(host);
		}
		else {
			await ns.hack(host);
		}
	}
}