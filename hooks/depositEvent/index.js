const defaults = require('../../core/defaults')
const path = require('path')

module.exports = {
	priority: 0,
	init: async ({ depositContract: contract, pool }) => {
		try {
			for (let i = 0; i < defaults.depositEventListener.count; i++) {
				contract.on('DepositEvent', (
					pubkey,
					amount,
					timestamp,
					index,
					event,
				) => {
					event.getTransaction()
						.then(transaction => {
							transaction.wait(defaults.network.transaction.confirmations)
								.then((rct) => {
									pool.run({
										pubkey,
										amount,
										timestamp,
										index,
										transactionHash: rct.transactionHash,
									}, { filename: path.join(__dirname, '../../workers/distributeStellarToken') })
								})
						})
				})
				console.log(`DepositEvent: ✅ #${i} listener added`)
			}
		}
		catch (error) {
			console.log('DepositEvent: ❌ no listener added')
			console.error(error)
		}
	},
}