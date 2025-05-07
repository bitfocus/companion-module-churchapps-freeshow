let variableUpdater
function InitVariables(self) {
	const internalVariables = ['connection_status']
	const variables = {
		// internal
		connection_status: { description: 'Connection status', default: 'Disconnected' },

		// show
		show_name: { description: 'Show name' },
		show_name_next: { description: 'Next show name' },

		layout_slides: { description: 'Layout slides count' },
		layout_notes: { description: 'Layout notes' },

		slide_number: { description: 'Current slide number' },
		slide_group: { description: 'Current slide group' },
		slide_group_next: { description: 'Next slide group' },
		slide_notes: { description: 'Current slide notes' },
		slide_notes_next: { description: 'Next slide notes' },
		slide_text_previous: { description: 'Previous slide text' },
		slide_text_current: { description: 'Current slide text' },
		slide_text_next: { description: 'Next slide text' },

		// video
		video_time: { description: 'Playing video time', default: '00:00' },
		video_countdown: { description: 'Playing video time remaining', default: '00:00' },
		video_duration: { description: 'Playing video length', default: '00:00' },

		// audio
		audio_title: { description: 'Playing audio title' },
		audio_time: { description: 'Playing audio time', default: '00:00' },
		audio_countdown: { description: 'Playing audio time remaining', default: '00:00' },
		audio_duration: { description: 'Playing audio length', default: '00:00' },
		audio_volume: { description: 'Audio volume' },

		// timer
		timer_status: { description: 'Timer status (playing/paused/stopped)', default: 'Stopped' },

		// custom
		active_layers: { description: 'Active output layers' },
		active_styles: { description: 'Active output styles' },
	}

	const variableList = Object.entries(variables).map(([id, value]) => ({
		variableId: id,
		name: value.description || '',
	}))
	self.setVariableDefinitions(variableList)
	self.initializedVariables = variableList

	// set defaults
	const defaultVariableValues = {}
	Object.entries(variables).forEach(([id, value]) => {
		// if (!value.default) return
		defaultVariableValues[id] = value.default ?? 'N/A'
	})
	self.setVariableValues(defaultVariableValues)

	// update variables every second
	variableUpdater = setInterval(() => {
		const data = { isVariable: true, keys: Object.keys(variables).filter((a) => !internalVariables.includes(a)) }
		self.socket?.emit('data', JSON.stringify(data))
	}, 1000)
}

function StopUpdatingVariables() {
	if (variableUpdater) clearTimeout(variableUpdater)
}

module.exports = { InitVariables, StopUpdatingVariables }
