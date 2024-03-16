module.exports = function (self) {
	const actionData = {
		next_slide: { name: 'Next slide' },
		previous_slide: { name: 'Previous slide' },
		next_project_show: { name: 'Next show' },
		previous_project_show: { name: 'Previous show' },
		// goto_group: {name: "Go to group", options},

		clear_all: { name: 'Clear all' },
		clear_background: { name: 'Clear background' },
		clear_slide: { name: 'Clear slide' },
		clear_overlays: { name: 'Clear overlays' },
		clear_audio: { name: 'Clear audio' },
		clear_next_timer: { name: 'Clear next slide timer' },

		// change_output_style // Change output style

		// index_select_project // Select project by index
		// index_select_project_show // Select project item by index
		index_select_slide: {
			name: 'Select slide by index',
			options: [
				{
					id: 'index',
					type: 'number',
					label: 'Slide index',
					default: 1,
					min: 1,
					max: 1000,
				},
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
		let data = JSON.stringify({ ...event.options, action })

		// log action
		let options = Object.keys(event.options).length ? ` + ${JSON.stringify(event.options)}` : ''
		console.log(`Sending action: ${action}${options}`)

		self.send(data)
	}
}
