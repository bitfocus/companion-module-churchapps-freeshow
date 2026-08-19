const { InstanceStatus } = require('@companion-module/base')
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
		self.updateStatus(InstanceStatus.Ok)
		self.setVariableValues({ connection_status: 'Connected' })

		self.requestActionValues?.()
		// self.checkVariables();
	})
	self.socket.on('disconnect', () => {
		self.updateStatus(InstanceStatus.Warning, 'Lost connection to WebSocket server')
		self.setVariableValues({ connection_status: 'Disconnected' })
		self.log('error', 'Lost connection.')
	})
	self.socket.on('error', (err) => self.log('error', `Error message from server: ${err}`))

	// state change
	self.socket.on('data', (data) => {
		if (data.isVariable) {
			if (!data.values) return

			// timers with no name causing issues
			const filteredValues = Object.fromEntries(Object.entries(data.values).filter(([key]) => isNamedTimerKey(key)))
			// console.log(data.values)

			let newVariables = []

			// set empty to N/A
			Object.keys(filteredValues).forEach((key) => {
				// add if it does not exist
				if (!self.initializedVariables.find((a) => a.variableId === key)) {
					newVariables.push({ variableId: key, name: getNameFromKey(key) })
				}

				if (filteredValues[key] === '') filteredValues[key] = 'N/A'
			})

			if (newVariables.length) {
				self.initializedVariables.push(...newVariables)
				const variableDefinitions = Object.fromEntries(
					self.initializedVariables.map(({ variableId, name }) => [variableId, { name }]),
				)
				self.setVariableDefinitions(variableDefinitions)
			}
			self.setVariableValues(filteredValues)

			self.variableData = filteredValues
			self.checkAllFeedbacks()
			return
		}

		if (data.action === 'get_actions') {
			const actionsList = (data.data || []).map((item) => ({
				id: String(item.id),
				label: item.name || item.label || item.id,
			}))

			if (self.actionDefinitions?.run_action_options) {
				const actionField = self.actionDefinitions.run_action_options.options.find((field) => field.id === 'action')
				if (actionField) actionField.choices = actionsList
				self.setActionDefinitions(self.actionDefinitions)
			}
			return
		}

		console.log('Data received:', data)
		self.checkAllFeedbacks()
	})
}

function isNamedTimerKey(key) {
	if (!key.startsWith('timer_')) return true
	if (key === 'timer_status') return true

	const timerName = key
		.slice(6)
		.replace(/_status$/, '')
		.replaceAll('_', '')
	return timerName.length > 0
}

function getNameFromKey(key) {
	if (!key) return ''

	let value = ''
	if (key.includes('variable_')) {
		value = 'Variable: '
		key = key.slice(9)
	} else if (key.includes('timer_')) {
		value = 'Timer: '
		key = key.slice(6)
	}

	if (!key) return value.trim()

	value += key[0].toUpperCase() + key.slice(1).replaceAll('_', ' ')
	return value
}
