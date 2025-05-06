const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const CreateClient = require('./src/connect')
const InitActions = require('./src/actions')
const InitPresets = require('./src/presets')
const { InitVariables, StopUpdatingVariables } = require('./src/variables')
const InitFeedback = require('./src/feedback')

const configuration = [
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

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.initWebSocket()
		this.initActions()
		this.initPresets()
		this.initVariables()
		this.initFeedback()

		this.internalVariable = {}
	}

	async destroy() {
		this.log('debug', 'Module deleted!')
		StopUpdatingVariables()
	}

	async configUpdated(config) {
		this.config = config
		this.initWebSocket()
	}

	getConfigFields = () => configuration
	initWebSocket = () => CreateClient(this)

	initActions = () => InitActions(this)
	initPresets = () => InitPresets(this)
	initVariables = () => InitVariables(this)
	initFeedback = () => InitFeedback(this)
}

runEntrypoint(ModuleInstance, [])
