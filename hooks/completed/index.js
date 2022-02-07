const defaults = require('../../core/defaults')
module.exports = {
	priority: 0,
	init: async ({ pool }) => {
		try {
			setInterval(() => {
				console.log(`Piscina: 🍥 ${pool.completed} ✓ completed`)
			}, defaults.timeToUpdate)
		}
		catch (error) {
			console.error(error)
		}
	},
}