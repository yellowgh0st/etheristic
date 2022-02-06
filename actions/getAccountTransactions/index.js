const stellar = require('stellar-sdk')
const defaults = require('../../core/defaults')

module.exports = async (pubkey) => {
	const horizon = new stellar.Server(defaults.stellar.server.url)
	const query = await horizon
		.transactions()
		.forAccount(pubkey)
		.order('desc')
		.limit(defaults.stellar.server.queryLimit)
	const transactions = []

	let call = await query.call()
	while (call.records.length > 0) {
		call.records.forEach((record) => transactions.push(record))
		call = await call.next()
	}

	return transactions
}
