const indexInput = { id: 'index', type: 'number', label: 'Index', default: 1, min: 1, max: 5000 }
const valueInput = { id: 'value', type: 'textinput', label: 'Name' }
const idInput = { id: 'id', type: 'textinput', label: 'ID', tooltip: 'Check the FreeShow configs to find ids' }
const volumeInput = { id: 'volume', type: 'number', label: 'Volume', default: 1, min: 0, max: 1, step: 0.1 }
const gainInput = { id: 'gain', type: 'number', label: 'Gain', default: 0, min: 0, max: 1, step: 0.1 }
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

module.exports = function (self) {
	const actionData = {
		// PROJECT
		index_select_project: { name: 'Select project by index', options: [indexInput] },
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
		lock_output: { name: 'Toggle output lock' },
		toggle_output_windows: { name: 'Toggle output windows' },
		id_select_group: { name: 'Select slide group by ID', options: [idInput] },

		// STAGE
		id_select_stage_layout: { name: 'Select stage layout by ID', options: [idInput] },

		// CLEAR
		restore_output: { name: 'Restore output' },
		clear_all: { name: 'Clear all' },
		clear_background: { name: 'Clear background' },
		clear_slide: { name: 'Clear slide' },
		clear_overlays: { name: 'Clear overlays' },
		clear_audio: { name: 'Clear audio' },
		clear_next_timer: { name: 'Clear next slide timer' },

		// OVERLAYS
		index_select_overlay: { name: 'Toggle overlay by index', options: [indexInput] },
		name_select_overlay: { name: 'Toggle overlay by name', options: [valueInput] },

		// AUDIO
		change_volume: { name: 'Change audio volume', options: [volumeInput, gainInput] },

		// VISUAL
		id_select_output_style: { name: 'Select output style by ID', options: [idInput] },
		change_transition: { name: 'Change transition', options: transitionInputs },

		// OTHER
		change_variable: { name: 'Change variable', options: variableInputs },
		custom_message: {
			name: 'Custom API message',
			options: [
				{ id: 'id', type: 'textinput', label: 'API ID' },
				{ ...valueInput, tooltip: 'Format as stringified JSON. E.g: {"value": "hi"}' },
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

		// custom message
		if (action === 'custom_message') {
			action = data.id
			data = { ...JSON.parse(data.value || '{}'), action }
		}

		// log action
		let options = Object.keys(event.options).length ? ` + ${JSON.stringify(event.options)}` : ''
		console.log(`Sending action: ${action}${options}`)

		self.send(data)
	}
}
