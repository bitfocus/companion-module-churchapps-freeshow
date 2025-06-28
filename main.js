const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const CreateClient = require('./src/connect')
const InitActions = require('./src/actions')
const InitPresets = require('./src/presets')
const { InitVariables, StopUpdatingVariables } = require('./src/variables')
const InitFeedback = require('./src/feedback')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.availableVariables = [] // Cache for FreeShow variables
		this.availableTimers = [] // Cache for FreeShow timers
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.initializedVariables = []
		this.internalVariable = {}

		this.initWebSocket()
		this.initActions()
		this.initPresets()
		this.initVariables()
		this.initFeedback()
	}

	async destroy() {
		this.log('debug', 'Module deleted!')
		StopUpdatingVariables()
		if (this.socket) {
			this.socket.close()
		}
	}

	async configUpdated(config) {
		this.config = config
		this.initWebSocket()
	}

	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Destination IP',
				width: 8,
				default: '127.0.0.1',
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Port',
				width: 4,
				default: 5505,
				regex: Regex.PORT,
			},
		]
	}

	initWebSocket() {
		CreateClient(this)
	}

	initActions() {
		InitActions(this)
	}

	initPresets() {
		InitPresets(this)
	}

	initVariables() {
		InitVariables(this)
	}

	initFeedback() {
		InitFeedback(this)
	}

	// Fetch variables from FreeShow
	async fetchVariables() {
		if (!this.socket || !this.socket.connected) {
			this.log('warn', 'Cannot fetch variables - not connected to FreeShow')
			return
		}

		return new Promise((resolve) => {
			// Set up a one-time listener for the response
			const responseHandler = (data) => {
				if (data.action === 'get_variables' && data.data) {
					this.availableVariables = data.data
					this.updateActionDefinitions()
					this.socket.off('data', responseHandler)
					resolve(data.data)
				}
			}

			this.socket.on('data', responseHandler)
			
			// Send the request
			this.send({ action: 'get_variables' })

			// Timeout after 5 seconds
			setTimeout(() => {
				this.socket.off('data', responseHandler)
				resolve([])
			}, 5000)
		})
	}

	// Fetch timers from FreeShow
	async fetchTimers() {
		if (!this.socket || !this.socket.connected) {
			this.log('warn', 'Cannot fetch timers - not connected to FreeShow')
			return
		}

		return new Promise((resolve) => {
			// Set up a one-time listener for the response
			const responseHandler = (data) => {
				if (data.action === 'get_timers' && data.data) {
					this.availableTimers = data.data
					this.log('info', `Loaded ${data.data.length} timers from FreeShow`)
					this.updateActionDefinitions()
					this.socket.off('data', responseHandler)
					resolve(data.data)
				}
			}

			this.socket.on('data', responseHandler)
			
			// Send the request
			this.send({ action: 'get_timers' })

			// Timeout after 5 seconds
			setTimeout(() => {
				this.log('warn', 'Timeout waiting for get_timers response')
				this.socket.off('data', responseHandler)
				resolve([])
			}, 5000)
		})
	}

	// Update action definitions with current variable choices
	updateActionDefinitions() {
		// Update variable choices if the method exists
		if (this.updateVariableChoices) {
			this.updateVariableChoices()
		}
		// Update timer choices if the method exists
		if (this.updateTimerChoices) {
			this.updateTimerChoices()
		}
	}

	// Get variable choices for dropdown
	getVariableChoices() {
		return this.availableVariables.map(variable => ({
			id: variable.name,
			label: `${variable.name} (${variable.type})`
		}))
	}

	// Get variable type by name
	getVariableType(name) {
		const variable = this.availableVariables.find(v => v.name === name)
		return variable ? variable.type : 'text'
	}

	// Get timer choices for dropdown (counter timers only)
	getCounterTimerChoices() {
		return this.availableTimers
			.filter(timer => timer.type === 'counter')
			.map(timer => ({
				id: timer.name,
				label: timer.name
			}))
	}

	// Get timer choices for dropdown (clock timers only)
	getClockTimerChoices() {
		return this.availableTimers
			.filter(timer => timer.type === 'clock')
			.map(timer => ({
				id: timer.name,
				label: timer.name
			}))
	}

	// Get timer by name
	getTimerByName(name) {
		return this.availableTimers.find(t => t.name === name)
	}
}

runEntrypoint(ModuleInstance, [])