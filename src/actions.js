const indexInput = { id: 'index', type: 'number', label: 'Index', default: 1, min: 1, max: 5000 }
const valueInput = { id: 'value', type: 'textinput', label: 'Name' }
const idInput = { id: 'id', type: 'textinput', label: 'ID', tooltip: 'Check the FreeShow configs to find ids' }
const volumeInput = { id: 'volume', type: 'number', label: 'Volume', default: 1, min: 0, max: 1, step: 0.1 }
const gainInput = { id: 'gain', type: 'number', label: 'Gain', default: 0, min: 0, max: 1, step: 0.1 }
const seekInput = { id: 'seconds', type: 'number', label: 'Seek to seconds', default: 0, min: 0 }
const scriptureInput = {
	id: 'value',
	type: 'textinput',
	label: 'Reference',
	tooltip: 'To display Genesis 1:1, type: 1.1.1',
}
const transitionInputs = [
	{
		type: 'dropdown',
		label: 'Text or Media?',
		id: 'id',
		default: 'text',
		choices: [
			{ id: 'text', label: 'Text' },
			{ id: 'media', label: 'Media' },
		],
	},
	{
		type: 'dropdown',
		label: 'Type',
		id: 'type',
		default: 'fade',
		choices: [
			{ id: 'none', label: 'None' },
			{ id: 'blur', label: 'Blur' },
			{ id: 'fade', label: 'Fade' },
			{ id: 'crossfade', label: 'Crossfade' },
			{ id: 'fly', label: 'Fly' },
			{ id: 'scale', label: 'Scale' },
			{ id: 'spin', label: 'Spin' },
		],
	},
	{ id: 'duration', type: 'number', label: 'Duration (ms)', default: 500, min: 0 },
	{ id: 'easing', type: 'textinput', label: 'Easing', default: 'sine' },
]
const variableName = {
	id: 'name',
	type: 'textinput',
	label: 'Variable name',
	tooltip: 'The name of the variable that should be changed',
}
const variableInputs = [
	variableName,
	{ id: 'value', type: 'textinput', label: 'Value', tooltip: 'Keep empty to toggle on/off' },
	{
		type: 'dropdown',
		label: 'Action',
		id: 'variableAction',
		default: '',
		choices: [
			{ id: '', label: 'None' },
			{ id: 'increment', label: 'Increment' },
			{ id: 'decrement', label: 'Decrement' },
		],
	},
]
const toggleOptions = [
	{
		type: 'dropdown',
		label: 'Mode',
		id: 'mode',
		default: 'toggle',
		choices: [
			{ id: 'toggle', label: 'Toggle' },
			{ id: 'enable', label: 'Enable' },
			{ id: 'disable', label: 'Disable' },
		],
	},
]

module.exports = function (self) {
	const actionData = {
		// PROJECT
		index_select_project: { name: 'Select project by index', options: [indexInput] },
		name_select_project: { name: 'Select project by name', options: [valueInput] },
		next_project_item: { name: 'Next project item' },
		previous_project_item: { name: 'Previous project item' },
		index_select_project_item: { name: 'Select project item by index', options: [indexInput] },

		// SHOWS
		name_select_show: { name: 'Select show by name', options: [valueInput] },

		// PRESENTATION
		next_slide: { name: 'Next slide' },
		previous_slide: { name: 'Previous slide' },
		index_select_slide: { name: 'Select slide by index', options: [indexInput] },
		name_select_slide: { name: 'Select slide by name', options: [valueInput] },
		id_select_group: { name: 'Select slide group by ID', options: [idInput] },

		// CLEAR
		restore_output: { name: 'Restore output' },
		clear_all: { name: 'Clear all' },
		clear_background: { name: 'Clear background' },
		clear_slide: { name: 'Clear slide' },
		clear_overlays: { name: 'Clear overlays' },
		clear_audio: { name: 'Clear audio' },
		clear_next_timer: { name: 'Clear next slide timer' },

		// MEDIA
		video_seekto: { name: 'Video seek to time', options: [seekInput] },

		// OVERLAYS
		index_select_overlay: { name: 'Toggle overlay by index', options: [indexInput] },
		name_select_overlay: { name: 'Toggle overlay by name', options: [valueInput] },

		// SCRIPTURE
		start_scripture: { name: 'Start scripture from reference', options: [scriptureInput] },
		scripture_next: { name: 'Next scripture verse' },
		scripture_previous: { name: 'Previous scripture verse' },

		// OUTPUT
		lock_output: { name: 'Toggle output lock' },
		toggle_output_windows: { name: 'Toggle output windows' },
		id_select_output_style: { name: 'Select output style by ID', options: [idInput] },
		change_transition: { name: 'Change transition', options: transitionInputs },

		// STAGE
		id_select_stage_layout: { name: 'Select stage layout by ID', options: [idInput] },

		// AUDIO
		audio_seekto: { name: 'Audio seek to time', options: [seekInput] },
		change_volume: { name: 'Change audio volume', options: [volumeInput, gainInput] },
		name_start_playlist: { name: 'Start playlist by name', options: [valueInput] },
		playlist_next: { name: 'Next track in playlist' },

		// TIMERS
		name_start_timer: { name: 'Start timer by name', options: [valueInput] },
		pause_timers: { name: 'Pause active timers' },
		stop_timers: { name: 'Stop active timers' },
		timer_seekto: { name: 'Timer seek to time', options: [seekInput] },

		// FUNCTIONS
		change_variable: { name: 'Change variable', options: variableInputs },

		// OTHER
		toggle_log_song_usage: {
			name: 'Toggle log song usage',
			description: 'Enable, disable or toggle logging of song usage',
			options: toggleOptions,
		},

		// ACTION
		name_run_action: { name: 'Run action by name', description: 'Run an action from its name', options: [valueInput] },
		run_action: { name: 'Run action by ID', description: 'Run an action from its ID', options: [idInput] },

		// OTHER
		custom_message: {
			name: 'Custom API message',
			description: 'Send a custom API to FreeShow message that is not added specifically to Companion',
			options: [
				{ id: 'id', type: 'textinput', label: 'API ID' },
				{ ...valueInput, label: 'JSON Value', tooltip: 'Format as stringified JSON. E.g: {"value": "hi"}' },
			],
		},

		// custom variable internally used by the module (any text in value input can be replaced by this)
		set_self_variable: {
			name: 'Custom variable (internal)',
			description:
				'Only used internally in this module. The set value can be referenced in any "value" field using the $(name) format.',
			options: [
				{ id: 'key', type: 'textinput', label: 'Variable name' },
				{ id: 'value', type: 'textinput', label: 'Variable value' },
			],
		},
	}

	let actions = {}
	Object.keys(actionData).forEach((id) => {
		let data = actionData[id]
		let action = data

		if (!action.options) action.options = []
		action.callback = (event) => trigger(event)

		actions[id] = action
	})

	self.setActionDefinitions(actions)

	// BUTTON PRESS
	function trigger(event) {
		let config = self.config
		if (!config.host || !config.port) return

		// add options if missing
		if (!event.options) event.options = {}

		// format data
		let action = event.actionId
		let data = { ...event.options, action }

		if (action === 'set_self_variable') {
			if (!data.key) return
			self.internalVariable[data.key] = data.value
			self.checkFeedbacks()
			return
		}

		// custom message
		if (action === 'custom_message') {
			action = data.id
			data = { ...JSON.parse(data.value || '{}'), action }
		}

		// parse custom variable values
		if (data.value?.includes('$(')) {
			data.value = replaceVariables(data.value, self.internalVariable)
		}

		if (action === 'start_scripture') data.reference = data.value

		// custom
		if (action === 'toggle_log_song_usage') data = toggle(data)

		// log action
		let options = Object.keys(event.options).length ? ` + ${JSON.stringify(event.options)}` : ''
		console.log(`Sending action: ${action}${options}`)

		self.send(data)
	}
}

function replaceVariables(template, values) {
	return template.replace(/\$\(([^)]+)\)/g, (match, varName) => {
		return values.hasOwnProperty(varName) ? values[varName] : match
	})
}

function toggle(data) {
	switch (data.mode) {
		case 'enable':
			data.value = true
			break
		case 'disable':
			data.value = false
			break
		default:
			delete data.value
	}
	delete data.mode

	return data
}
