// const { setTimeout } = require('timers/promises')
const { utils } = require('ethers')
const getAccountTransactions = require('../actions/getAccountTransactions')
const base64toHex = require('../core/base64toHex')

const makePayment = require('../actions/makePayment')

module.exports = async ({
	pubkey,
	amount,
	timestamp,
	index,
	transactionHash,
}) => {
	const history = await getAccountTransactions(utils.toUtf8String(pubkey))
	const distributed = history.find((transaction) => {
		if (transaction.memo) {
			return base64toHex(transaction.memo) === transactionHash.slice(2)
		}
	}) ? true : false

	if(history.length > 0 &&
		!distributed) {
		await makePayment(
			utils.toUtf8String(pubkey),
			Number(utils.formatUnits(amount, 18)).toFixed(7),
			transactionHash.slice(2),
		)
	}
}