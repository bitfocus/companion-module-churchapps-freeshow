const io = require('socket.io-client')

module.exports = function (self) {
	let config = self.config

	if (!config.host) return self.log('error', 'Missing Destination IP in configuration.')
	if (!config.port) return self.log('error', 'Missing Port in configuration.')

	// close existing
	if (self.socket) {
		self.log('info', `Closing client!`)
		self.socket.close()
	}

	// create connection
	const url = `http://${config.host}:${config.port}`
	self.socket = io.connect(url, { reconnection: true })
	self.log('info', `Searching for WebSocket server at ${url}...`)

	// receiver
	addListeners(self)
	// sender
	self.send = (data) => self.socket.emit('data', JSON.stringify(data))
}

function addListeners(self) {
	self.socket.on('connect', () => {
		self.log('info', 'Connected to FreeShow!')
		self.setVariableValues({ connection_status: 'Connected' })
		// self.checkVariables();
		
		// Fetch available variables after connecting
		setTimeout(() => {
			self.fetchVariables()
		}, 1000) // Small delay to ensure connection is stable
	})
	self.socket.on('disconnect', () => {
		self.setVariableValues({ connection_status: 'Disconnected' })
		self.log('error', 'Lost connection.')
		self.availableVariables = [] // Clear cached variables
	})
	self.socket.on('error', (err) => self.log('error', `Error message from server: ${err}`))

	// state change
	self.socket.on('data', (data) => {
		self.log('debug', `📥 RAW WebSocket Data Received: ${JSON.stringify(data, null, 2)}`)
		if (data.action === 'get_variables' && data.data) {
			// This will be handled by the promise in fetchVariables()
			return
		}
		
		if (data.isVariable) {
			if (!data.values) return
			// console.log(data.values)

			let newVariables = []

			// set empty to N/A
			Object.keys(data.values).forEach((key) => {
				// add if it does not exist
				if (!self.initializedVariables.find((a) => a.variableId === key)) {
					newVariables.push({ variableId: key, name: getNameFromKey(key) })
				}

				if (data.values[key] === '') data.values[key] = 'N/A'
			})

			if (newVariables.length) {
				self.initializedVariables.push(...newVariables)
				self.setVariableDefinitions(self.initializedVariables)
			}
			self.setVariableValues(data.values)

			self.variableData = data.values
			self.checkFeedbacks()
			return
		}

		console.log('Data received:', data)
		self.checkFeedbacks()
	})
}

function getNameFromKey(key) {
	let value = ''
	if (key.includes('variable_')) {
		value = 'Variable: '
		key = key.slice(9)
	} else if (key.includes('timer_')) {
		value = 'Timer: '
		key = key.slice(6)
	}

	value += key[0].toUpperCase() + key.slice(1).replaceAll('_', ' ')
	return value
}
