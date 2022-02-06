module.exports = (raw) => {
	const buffer = Buffer.from(raw, 'base64')
	return buffer.toString('hex')
}