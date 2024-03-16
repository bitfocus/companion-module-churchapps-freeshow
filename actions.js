module.exports = function (self) {
	self.setActionDefinitions({
		next_slide: {
			name: 'Next slide',
			options: [],
			callback: (event) => trigger(event),
		},
		previous_slide: {
			name: 'Previous slide',
			options: [],
			callback: (event) => trigger(event),
		},
		next_project_show: {
			name: 'Next show',
			options: [],
			callback: (event) => trigger(event),
		},
		previous_project_show: {
			name: 'Previous show',
			options: [],
			callback: (event) => trigger(event),
		},
		// goto_group // Go to group

		clear_all: {
			name: 'Clear all',
			options: [],
			callback: (event) => trigger(event),
		},
		clear_background: {
			name: 'Clear background',
			options: [],
			callback: (event) => trigger(event),
		},
		clear_slide: {
			name: 'Clear slide',
			options: [],
			callback: (event) => trigger(event),
		},
		clear_overlays: {
			name: 'Clear overlays',
			options: [],
			callback: (event) => trigger(event),
		},
		clear_audio: {
			name: 'Clear audio',
			options: [],
			callback: (event) => trigger(event),
		},
		clear_next_timer: {
			name: 'Clear next slide timer',
			options: [],
			callback: (event) => trigger(event),
		},

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
			callback: (event) => trigger(event),
		},
	})

	function trigger(event) {
		let config = self.config

		if (!event.options) event.options = {}
		event.options.action = event.actionId
		let data = JSON.stringify(event.options)

		const url = `http://${config.host}:${config.port}`
		console.log(`Sending trigger "${event.actionId}" to: ${url}`)
		fetch(url, {
			method: 'POST',
			body: data,
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
		}).catch((err) => {
			// not expecting a response
			if (err.cause.toString().includes('HeadersTimeoutError')) return

			console.log('Something went wrong:', err)
		})
	}
}
