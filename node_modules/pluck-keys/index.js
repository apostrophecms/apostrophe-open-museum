module.exports = selectKeys

function selectKeys(keys, obj) {
	return keys.reduce(function (o, key) {
		if (typeof obj[key] != 'undefined') {
			o[key] = obj[key]
		}
		return o
	}, {})
}
