const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const CreateClient = require('./src/connect')
const UpdateActions = require('./src/actions')
const UpdatePresets = require('./src/presets')

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
		this.updateActions()
		this.updatePresets()
	}

	async destroy() {
		this.log('debug', 'Module deleted!')
	}

	async configUpdated(config) {
		this.config = config

		this.initWebSocket()
	}

	getConfigFields = () => configuration

	initWebSocket = () => CreateClient(this)
	updateActions = () => UpdateActions(this)
	updatePresets = () => UpdatePresets(this)
}

runEntrypoint(ModuleInstance, [])
