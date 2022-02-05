const hooksBuffer = require('./core/hooksBuffer')
const Piscina = require('piscina')
const { ethers } = require('ethers')
const defaults = require('./core/defaults')
const abi = require('./artifacts/abi/deposit')

const init = async () => {

	const depositContract = new ethers.Contract(
		defaults.network.contract.deposit,
		abi,
		defaults.network.provider,
	)
	const piscina = new Piscina ({})

	hooksBuffer((buffer) => {
		buffer.forEach((hook) => hook.init({
			depositContract: depositContract,
			pool: piscina,
		}))
	})

}

init()
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})