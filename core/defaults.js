require('dotenv').config()
const { ethers } = require('ethers')

const defaults = {}

defaults.network = {}
defaults.network.chainId = Number(process.env.CHAIN_ID)
defaults.network.provider = new ethers.providers.FallbackProvider(
	[
		{
			provider: new ethers.providers.AlchemyProvider(
				Number(process.env.CHAIN_ID),
				process.env.ALCHEMY_KEY,
			),
			weight: 1,
			priority: 1,
			stallTimeout: 2000,
		},
	],
)

defaults.network.contract = {}
defaults.network.contract.deposit = defaults.network.chainId === 4 ?
	'0x77304419048195263543E83C3BCDD42CBD43954e' :
	undefined

defaults.network.transaction = {}
defaults.network.transaction.confirmations = 3

defaults.depositEventListener = {}
defaults.depositEventListener.count = 2
defaults.timeToUpdate = 1000

module.exports = defaults