const defaults = require('../../core/defaults')
module.exports = {
	priority: 0,
	init: async ({ pool }) => setInterval(() => {
		console.log(`Piscina: 🍥 ${pool.queueSize} ∥ pool queue size`)
	}, defaults.timeToUpdate),
}