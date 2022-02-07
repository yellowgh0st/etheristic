module.exports = (raw) => {
	try {
		const buffer = Buffer.from(raw, 'base64')
		return buffer.toString('hex')
	}
	catch (error) {
		console.error(error)
	}
}