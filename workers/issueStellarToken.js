const { setTimeout } = require('timers/promises')
module.exports = async ({
	pubkey,
	amount,
	timestamp,
	index,
	transactionHash,
}) => {
	await setTimeout(10000)
	console.log({
		pubkey,
		amount,
		timestamp,
		index,
		transactionHash,
	})
}