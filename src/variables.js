// TODO:
// get actual variables values
// get timer values

let variableUpdater
function InitVariables(self) {
	const variables = {
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
		audio_volume: { description: 'Audio volume' },

		// custom
		active_layers: { description: 'Active output layers' },
	}

	const variableList = Object.entries(variables).map(([id, value]) => ({
		variableId: id,
		name: value.description || '',
	}))
	self.setVariableDefinitions(variableList)

	// set defaults
	const defaultVariableValues = {}
	Object.entries(variables).forEach(([id, value]) => {
		// if (!value.default) return
		defaultVariableValues[id] = value.default || ''
	})
	self.setVariableValues(defaultVariableValues)

	// update variables every second
	variableUpdater = setInterval(() => {
		self.socket.emit('data', JSON.stringify({ isVariable: true, keys: Object.keys(variables) }))
	}, 1000)
}

function StopUpdatingVariables() {
	if (variableUpdater) clearTimeout(variableUpdater)
}

module.exports = { InitVariables, StopUpdatingVariables }
