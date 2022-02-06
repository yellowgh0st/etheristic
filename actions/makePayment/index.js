const defaults = require('../../core/defaults')
const stellar = require('stellar-sdk')

module.exports = async (pubkey, amount, transactionHash) => {
	const horizon = new stellar.Server(defaults.stellar.server.url)
	const distributor = await horizon.loadAccount(defaults.stellar.account.distributor.keyPair.publicKey())
	const memo = new stellar.Memo.hash(transactionHash)

	const transaction = new stellar.TransactionBuilder(distributor, {
		fee: defaults.stellar.fee,
		networkPassphrase: stellar.Networks.TESTNET,
	})
		.addOperation(stellar.Operation.payment({
			destination: pubkey,
			asset: defaults.stellar.asset,
			amount: amount,
		}))
		.addMemo(memo)
		.setTimeout(defaults.stellar.transaction.timeout)
		.build()

	await transaction.sign(defaults.stellar.account.distributor.keyPair)
	await horizon.submitTransaction(transaction)
}