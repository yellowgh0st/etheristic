require('dotenv').config()
const { ethers } = require('ethers')
const stellar = require('stellar-sdk')

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
	'0x5A699d414De377Db7275Bbe4a41E7137cE465169' :
	undefined

defaults.network.transaction = {}
defaults.network.transaction.confirmations = 3

defaults.stellar = {}
defaults.stellar.network = 'testnet'
defaults.stellar.fee = 10000
defaults.stellar.server = {}
defaults.stellar.server.url = defaults.stellar.network === 'testnet' ?
	'https://horizon-testnet.stellar.org' :
	'https://horizon.stellar.org'
defaults.stellar.server.queryLimit = 200

defaults.stellar.account = {}
defaults.stellar.account.distributor = {}
defaults.stellar.account.distributor.secret = process.env.DISTRIBUTOR_SECRET
defaults.stellar.account.distributor.keyPair = stellar.Keypair.fromSecret(defaults.stellar.account.distributor.secret)
defaults.stellar.account.issuer = {}
defaults.stellar.account.issuer.public = defaults.stellar.network === 'testnet' ?
	'GC6SP434T2QOOXUGDMWHCKH4M6NBDV4KZORDTIP63RL5HXK3FXFXGIL2' :
	'GCEBPUZELKFLTYFCWIXXBOGPAB4PEMMJSSHDXGEFORBG5PPKOCTKODLV'

defaults.stellar.transaction = {}
defaults.stellar.transaction.timeout = 100
defaults.stellar.transaction.timeToWaitBeforeReSubmit = 3500

defaults.stellar.asset = new stellar.Asset(
	'VADER',
	defaults.stellar.account.issuer.public,
)

defaults.depositEventListener = {}
defaults.depositEventListener.count = 1
defaults.timeToUpdate = 1000

module.exports = defaults