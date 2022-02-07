const defaults = require('../../core/defaults')
module.exports = {
	priority: 0,
	init: async ({ pool }) => {
		try {
			setInterval(() => {
				console.log(`Piscina: 🍥 ${pool.queueSize} ∥ pool queue size`)
			}, defaults.timeToUpdate)
		}
		catch (error) {
			console.error(error)
		}
	},
}