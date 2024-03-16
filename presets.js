const { combineRgb } = require('@companion-module/base')

module.exports = function (self) {
	const presetData = {
		// COMMON
		previous_slide: {
			name: 'Previous slide',
			text: '❮',
			bgcolor: combineRgb(5, 115, 50),
		},
		next_slide: {
			name: 'Next slide',
			text: '❯',
			bgcolor: combineRgb(5, 115, 50),
		},
		next_project_show: {
			name: 'Next show',
			text: '⬇️',
			bgcolor: combineRgb(0, 25, 60),
		},
		previous_project_show: {
			name: 'Previous show',
			text: '⬆️',
			bgcolor: combineRgb(0, 25, 60),
		},
		clear_all: {
			name: 'Clear all',
			text: '✖',
			bgcolor: combineRgb(100, 8, 8),
		},

		// CLEAR
		clear_all_2: {
			category: 'Clear',
			id: 'clear_all',
			name: 'Clear All',
			bgcolor: combineRgb(100, 8, 8),
		},
		clear_background: {
			category: 'Clear',
			name: 'Clear Background',
			text: 'Clear BG',
			bgcolor: combineRgb(100, 8, 8),
		},
		clear_slide: {
			category: 'Clear',
			name: 'Clear Slide',
			bgcolor: combineRgb(100, 8, 8),
		},
		clear_overlays: {
			category: 'Clear',
			name: 'Clear Overlays',
			bgcolor: combineRgb(100, 8, 8),
		},
		clear_audio: {
			category: 'Clear',
			name: 'Clear Audio',
			bgcolor: combineRgb(100, 8, 8),
		},
		clear_next_timer: {
			category: 'Clear',
			name: 'Clear Next slide timer',
			bgcolor: combineRgb(100, 8, 8),
		},
	}

	// GENERATE SLIDE INDEXES
	for (let i = 1; i <= 30; i++) {
		presetData['index_select_slide_' + i] = {
			category: 'Slides',
			id: 'index_select_slide',
			name: 'Select slide at index ' + i,
			options: { index: i },
			text: i.toString(),
			bgcolor: combineRgb(20, 0, 20),
		}
	}

	let presets = {}
	Object.keys(presetData).forEach((id) => {
		let data = presetData[id]

		presets[id] = {
			type: 'button',
			category: data.category || 'Common',
			name: data.name || '',
			style: {
				text: data.text || data.name || ``,
				size: 'auto',
				color: data.color || combineRgb(255, 255, 255),
				bgcolor: data.bgcolor || combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: data.id || id, options: data.options || {} }],
					up: [],
				},
			],
		}
	})

	self.setPresetDefinitions(presets)
}
