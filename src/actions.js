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
		]
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
// Timer inputs for starting counter timers
const startCounterTimerInputs = [
	{
		id: 'value',
		type: 'dropdown',
		label: 'Timer name',
		default: '',
		choices: [], // Will be populated with counter timers only
		tooltip: 'Select a counter timer from FreeShow to start',
	},
	{
		type: 'static-text',
		id: 'start_timer_refresh_help',
		label: '',
		value: 'If the timer list is empty or outdated, restart the connection under the Connections Tab',
	},
]
// Timer inputs for clock timers (time editing)
const clockTimerInputs = [
	{
		id: 'name',
		type: 'dropdown',
		label: 'Timer name',
		default: '',
		choices: [], // Will be populated with clock timers only
		tooltip: 'Select a clock timer from FreeShow',
	},
	{
		type: 'static-text',
		id: 'clock_timer_refresh_help',
		label: '',
		value: 'If the timer list is empty or outdated, restart the connection under the Connections Tab',
	},
	{
		id: 'time',
		type: 'textinput',
		label: 'Time',
		tooltip: 'Enter time in HH:mm:ss format using 24-hour (military) time (e.g., 09:30:00, 14:15:30)',
		useVariables: true
	},
]

const variableName = {
	id: 'name',
	type: 'textinput',
	label: 'Variable name',
	tooltip: 'The name of the variable that should be changed',
}

// Static variable inputs for now - will be dynamically updated later
const dynamicVariableInputs = [
	{
		id: 'name',
		type: 'dropdown',
		label: 'Variable name',
		default: '',
		choices: [], // Will be populated dynamically
		tooltip: 'Select a variable from FreeShow',
	},
	{
		type: 'static-text',
		id: 'refresh_help',
		label: '',
		value: 'If the variable list is empty or outdated, restart the connection under the Connections Tab',
	},
	{ 
		id: 'variableValue', 
		type: 'textinput', 
		label: 'Variable Value',
		tooltip: 'Value to set for the selected variable. Supports Companion variables like $(custom:seconds)',
		useVariables: true  // This tells Companion to parse variables in this field
	},
	{
		type: 'dropdown',
		label: 'Number Action',
		id: 'variableAction',
		default: '',
		tooltip: 'Action to perform (only applies to number variables)',
		choices: [
			{ id: '', label: 'Set Value' },
			{ id: 'increment', label: 'Increment' },
			{ id: 'decrement', label: 'Decrement' },
		],
	},
]

// Timer inputs for counter timers (start/end editing)
const counterTimerInputs = [
	{
		id: 'name',
		type: 'dropdown',
		label: 'Timer name',
		default: '',
		choices: [], // Will be populated with counter timers only
		tooltip: 'Select a counter timer from FreeShow',
	},
	{
		type: 'static-text',
		id: 'timer_refresh_help',
		label: '',
		value: 'If the timer list is empty or outdated, restart the connection under the Connections Tab',
	},
	{
		id: 'start',
		type: 'textinput',
		label: 'Start',
		tooltip: 'Enter Seconds (leave empty to keep current value)',
		useVariables: true
	},
	{
		id: 'end',
		type: 'textinput',
		label: 'End',
		tooltip: 'Enter Seconds (leave empty to keep current value)',
		useVariables: true
	},
]

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
	// Function to validate and format time (HH:mm:ss)
	function validateAndFormatTime(timeStr) {
		if (!timeStr || timeStr.trim() === '') {
			return null // Empty string means don't update
		}
		
		// Remove any whitespace
		timeStr = timeStr.trim()
		
		// Check if it matches HH:mm:ss format
		const timeRegex = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/
		const match = timeStr.match(timeRegex)
		
		if (!match) {
			return '00:00:00' // Invalid format, default to 00:00:00
		}
		
		let [, hours, minutes, seconds] = match
		
		// Convert to numbers and validate ranges
		hours = parseInt(hours, 10)
		minutes = parseInt(minutes, 10)
		seconds = parseInt(seconds, 10)
		
		// Validate ranges
		if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
			return '00:00:00' // Invalid values, default to 00:00:00
		}
		
		// Format with leading zeros
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
	}

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
		name_start_timer: { name: 'Start timer', options: startCounterTimerInputs },
		name_pause_timer: { name: 'Pause timer', options: startCounterTimerInputs },
		name_stop_timer: { name: 'Stop timer', description:"Stops and resets timer", options: startCounterTimerInputs },
		pause_timers: { name: 'Pause active timers' },
		stop_timers: { name: 'Stop active timers', description:"Stops and resets active timers" },
		timer_seekto: { name: 'Timer seek to time', options: [seekInput] },
		edit_timer_counter: { name: 'Edit Timer (From Start To End)', options: counterTimerInputs },
		edit_timer_clock: { name: 'Edit Timer (Clock)', options: clockTimerInputs },

		// FUNCTIONS
		change_variable: { name: 'Change variable', options: dynamicVariableInputs },

		// ACTION
		name_run_action: { name: 'Run action by name', description: 'Run an action from its name', options: [valueInput] },
		run_action: { name: 'Run action by ID', description: 'Run an action from its ID', options: [idInput] },

		// OTHER
		custom_message: {
			name: 'Custom API message',
			description: 'Send a custom API to FreeShow message that is not added specifically to Companion',
			options: [
				{ id: 'id', type: 'textinput', label: 'API ID' },
				{ 
					...valueInput, 
					label: 'JSON Value', 
					tooltip: 'Format as stringified JSON. E.g: {"value": "hi"}. Supports Companion variables like $(custom:seconds)',
					useVariables: true
				},
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
		action.callback = async (event) => await trigger(event)

		actions[id] = action
	})

	self.setActionDefinitions(actions)

	// Method to update variable choices when available
	self.updateVariableChoices = function() {
		if (self.getVariableChoices) {
			// Update the choices in the dynamicVariableInputs
			const variableChoices = self.getVariableChoices()
			dynamicVariableInputs[0].choices = variableChoices
			
			// Update the action definition
			actionData.change_variable.options = [...dynamicVariableInputs]
			
			// Rebuild actions object
			let updatedActions = {}
			Object.keys(actionData).forEach((id) => {
				let data = actionData[id]
				let action = data

				if (!action.options) action.options = []
				action.callback = async (event) => await trigger(event)

				updatedActions[id] = action
			})
			
			self.setActionDefinitions(updatedActions)
		}
	}

	// Method to update timer choices when available
	self.updateTimerChoices = function() {
		if (self.getCounterTimerChoices) {
			// Update the choices in the counterTimerInputs
			const timerChoices = self.getCounterTimerChoices()
			counterTimerInputs[0].choices = timerChoices
			
			// Update the action definition
			actionData.edit_timer_counter.options = [...counterTimerInputs]
			
			// Also update the start timer dropdown with the same choices
			startCounterTimerInputs[0].choices = timerChoices
			actionData.name_start_timer.options = [...startCounterTimerInputs]
		}
	
		if (self.getClockTimerChoices) {
			// Update the choices in the clockTimerInputs
			const clockChoices = self.getClockTimerChoices()
			clockTimerInputs[0].choices = clockChoices
			
			// Update the action definition
			actionData.edit_timer_clock.options = [...clockTimerInputs]
		}
		
		// Rebuild actions object
		let updatedActions = {}
		Object.keys(actionData).forEach((id) => {
			let data = actionData[id]
			let action = data
	
			if (!action.options) action.options = []
			action.callback = async (event) => await trigger(event)
	
			updatedActions[id] = action
		})
		
		self.setActionDefinitions(updatedActions)
	}

	// BUTTON PRESS
	async function trigger(event) {
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
			// Parse variables in the JSON value before parsing JSON
			let jsonValue = data.value || '{}'
			
			if (jsonValue.includes('$(')) {
				const isCompanionVariable = jsonValue.match(/\$\((custom|internal|this):/);
				
				if (isCompanionVariable) {
					// Parse Companion variables
					try {
						jsonValue = await self.parseVariablesInString(jsonValue)
					} catch (error) {
						self.log('error', `Error parsing Companion variables in JSON: ${error.message}`)
					}
				} else {
					// Parse FreeShow internal variables
					jsonValue = replaceVariables(jsonValue, self.internalVariable)
				}
			}
			
			action = data.id
			try {
				data = { ...JSON.parse(jsonValue), action }
			} catch (error) {
				self.log('error', `Invalid JSON in custom message: ${error.message}`)
				return // Don't send invalid JSON
			}
		}

		// Handle change_variable action with type-specific logic
		if (action === 'change_variable') {
			// Auto-detect type from FreeShow variable
			const variableType = self.getVariableType ? self.getVariableType(data.name) : 'text'
			
			// Parse variables in the input value
			let inputValue = data.variableValue || ''
			
			if (inputValue.includes('$(')) {
				const isCompanionVariable = inputValue.match(/\$\((custom|internal|this):/);
				
				if (isCompanionVariable) {
					// Parse Companion variables using the correct method
					try {
						inputValue = await self.parseVariablesInString(inputValue)
					} catch (error) {
						self.log('error', `Error parsing variables: ${error.message}`)
					}
				} else {
					// Parse FreeShow internal variables
					inputValue = replaceVariables(inputValue, self.internalVariable)
				}
			}
			
			// Map variableValue to the correct key/value structure based on detected type
			if (variableType === 'text') {
				// For text variables, set key="text" and value=variableValue
				data.key = 'text'
				data.value = inputValue
				delete data.variableAction  // Remove number action for text variables
			} else if (variableType === 'number') {
				// For number variables, set key="value" and value=variableValue
				data.key = 'value'
				data.value = inputValue
				// Keep variableAction for number variables
			}
			
			// Clean up the input field
			delete data.variableValue
		}

		// Handle edit_timer_counter action
		if (action === 'edit_timer_counter') {
			// Get the timer ID
			const timer = self.getTimerByName ? self.getTimerByName(data.name) : null
			if (!timer) {
				self.log('error', `Timer "${data.name}" not found`)
				return
			}

			// Parse variables in start and end fields
			let startValue = data.start || ''
			let endValue = data.end || ''

			// Parse start field if it has variables
			if (startValue.includes('$(')) {
				const isCompanionVariable = startValue.match(/\$\((custom|internal|this):/);
				if (isCompanionVariable) {
					try {
						startValue = await self.parseVariablesInString(startValue)
					} catch (error) {
						self.log('error', `Error parsing Companion variables in start field: ${error.message}`)
					}
				} else {
					startValue = replaceVariables(startValue, self.internalVariable)
				}
			}

			// Parse end field if it has variables
			if (endValue.includes('$(')) {
				const isCompanionVariable = endValue.match(/\$\((custom|internal|this):/);
				if (isCompanionVariable) {
					try {
						endValue = await self.parseVariablesInString(endValue)
					} catch (error) {
						self.log('error', `Error parsing Companion variables in end field: ${error.message}`)
					}
				} else {
					endValue = replaceVariables(endValue, self.internalVariable)
				}
			}

			// Send two separate API calls for start and end (only if fields have values)
			if (startValue && startValue.trim() !== '') {
				self.send({
					action: 'edit_timer',
					id: timer.id,
					key: 'start',
					value: startValue
				})
			}
			
			if (endValue && endValue.trim() !== '') {
				self.send({
					action: 'edit_timer', 
					id: timer.id,
					key: 'end',
					value: endValue
				})
			}
			
			return // Don't continue with normal send
		}

		// Handle edit_timer_clock action
		if (action === 'edit_timer_clock') {
			// Get the timer ID
			const timer = self.getTimerByName ? self.getTimerByName(data.name) : null
			if (!timer) {
				self.log('error', `Timer "${data.name}" not found`)
				return
			}

			// Parse variables in time field
			let timeValue = data.time || ''

			// Parse time field if it has variables
			if (timeValue.includes('$(')) {
				const isCompanionVariable = timeValue.match(/\$\((custom|internal|this):/);
				if (isCompanionVariable) {
					try {
						timeValue = await self.parseVariablesInString(timeValue)
					} catch (error) {
						self.log('error', `Error parsing Companion variables in time field: ${error.message}`)
					}
				} else {
					timeValue = replaceVariables(timeValue, self.internalVariable)
				}
			}

			// Validate and format the time
			const formattedTime = validateAndFormatTime(timeValue)
			
			// Send API call only if time field has a value
			if (formattedTime !== null) {
				if (formattedTime === '00:00:00' && timeValue.trim() !== '00:00:00') {
					self.log('warn', `Invalid time format "${timeValue}", using default 00:00:00`)
				}
				
				self.send({
					action: 'edit_timer',
					id: timer.id,
					key: 'time',
					value: formattedTime
				})
			}
			
			return // Don't continue with normal send
		}

		if (action === 'start_scripture') data.reference = data.value

		// General variable parsing for any action with a string data.value
		if (typeof data.value === 'string' && data.value.includes('$(')) {
			const isCompanionVariable = data.value.match(/\$\((custom|internal|this):/);
			
			if (isCompanionVariable) {
				// Parse Companion variables
				try {
					data.value = await self.parseVariablesInString(data.value)
				} catch (error) {
					self.log('error', `Error parsing Companion variables: ${error.message}`)
				}
			} else {
				// Parse FreeShow internal variables
				data.value = replaceVariables(data.value, self.internalVariable)
			}
		}
		const jsonData = JSON.stringify(data)
		self.log('debug', `📤 RAW WebSocket Data Sent: ${jsonData}`)
		self.send(data)
	}
}

function replaceVariables(template, values) {
	return template.replace(/\$\(([^)]+)\)/g, (match, varName) => {
		return values.hasOwnProperty(varName) ? values[varName] : match
	})
}