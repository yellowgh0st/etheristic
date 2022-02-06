// const { setTimeout } = require('timers/promises')
const { utils } = require('ethers')

const makePayment = require('../actions/makePayment')

module.exports = async ({
	pubkey,
	amount,
	timestamp,
	index,
	transactionHash,
}) => {
	await makePayment(
		utils.toUtf8String(pubkey),
		Number(utils.formatUnits(amount, 18)).toFixed(7),
		transactionHash.slice(2),
	)
}