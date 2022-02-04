const Piscina = require('piscina')
// const { resolve } = require('path')
const { ethers } = require('ethers')
const defaults = require('./core/defaults')
const abi = require('./artifacts/abi/deposit')

const contract = new ethers.Contract(
	defaults.network.contract.deposit,
	abi,
	defaults.network.provider,
)

const pool = new Piscina ({
	// filename: resolve(`${__dirname}/workers`, 'worker.js'),
	maxQueue: 'auto',
})

const init = async () => {
	contract.on('DepositEvent', (pubkey, amount, timestamp, index) => {
		console.log(pubkey)
		console.log(amount)
		console.log(timestamp.toString())
		console.log(index)
	})
}

init()
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})