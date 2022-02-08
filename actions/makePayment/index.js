const defaults = require('../../core/defaults')
const stellar = require('stellar-sdk')
const { setTimeout } = require('timers/promises')

const submit = async (
	pubkey,
	amount,
	transactionHash,
) => {
	try {
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
	catch (error) {
		await setTimeout(defaults.stellar.transaction.timeToWaitBeforeReSubmit)
		await submit(pubkey, amount, transactionHash)
		if (error?.response?.data) {
			if (error.response.data.extras) {
				if(error.response.data.extras.result_codes.transaction) {
					console.error(error.response.data.extras.result_codes.transaction)
				}
				else {
					console.error(error.response.data.extras)
				}
			}
			else {
				console.error(error.response.data)
			}
		}
		else {
			console.error(error)
		}
	}
}

module.exports.submit = submit