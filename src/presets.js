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
		next_project_item: {
			name: 'Next project item',
			text: '⬇️',
			bgcolor: combineRgb(0, 25, 60),
		},
		previous_project_item: {
			name: 'Previous project item',
			text: '⬆️',
			bgcolor: combineRgb(0, 25, 60),
		},
		clear_all: {
			name: 'Clear all',
			text: '✖',
			bgcolor: combineRgb(100, 8, 8),
		},
		lock_output: {
			name: 'Toggle output lock',
			text: '🔒',
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

	const groups = {
		break: { name: 'Break', color: combineRgb(245, 37, 94) },
		bridge: { name: 'Bridge', color: combineRgb(245, 37, 152) },
		chorus: { name: 'Chorus', color: combineRgb(245, 37, 210) },
		intro: { name: 'Intro', color: combineRgb(213, 37, 245) },
		outro: { name: 'Outro', color: combineRgb(165, 37, 245) },
		pre_chorus: { name: 'Pre Chorus', color: combineRgb(136, 37, 245) },
		tag: { name: 'Tag', color: combineRgb(117, 37, 245) },
		verse: { name: 'Verse', color: combineRgb(88, 37, 245) },
	}
	// GENERATE GROUPS
	for (let i = 0; i < Object.keys(groups).length; i++) {
		const groupId = Object.keys(groups)[i]
		const group = groups[groupId]
		presetData['id_select_group_' + groupId] = {
			category: 'Groups',
			id: 'id_select_group',
			name: `Switch between groups of this type`,
			text: group.name,
			bgcolor: group.color,
			options: { id: groupId },
		}
	}

	// GENERATE TRANSITIONS
	const transitions = ['None', 'Blur', 'Fade', 'Crossfade', 'Fly', 'Scale', 'Spin']
	for (let i = 0; i < transitions.length; i++) {
		const transition = transitions[i]
		presetData['change_transition_' + i] = {
			category: 'Transitions',
			id: 'change_transition',
			name: `Set transition to ${transition}%`,
			text: `${transition}`,
			bgcolor: combineRgb(0, 50, i * 10 + 10),
			options: { id: 'text', type: transition.toLowerCase() },
		}
	}

	// GENERATE VOLUME LEVELS
	const volumes = [0, 25, 50, 75, 100]
	for (let i = 0; i < volumes.length; i++) {
		const volume = volumes[i]
		presetData['change_volume_' + i] = {
			category: 'Volume',
			id: 'change_volume',
			name: `Set volume to ${volume}%`,
			text: `${volume}%`,
			bgcolor: combineRgb(volume + 20, 0, volume),
			options: { volume: volume / 100 },
		}
	}

	// GENERATE SLIDE INDEXES
	for (let i = 1; i <= 30; i++) {
		presetData['index_select_slide_' + i] = {
			category: 'Slides',
			id: 'index_select_slide',
			name: 'Select slide at index ' + i,
			text: i.toString(),
			bgcolor: combineRgb(20, 0, 20),
			options: { index: i },
		}
	}

	let presets = {}
	Object.keys(presetData).forEach((id) => {
		let data = presetData[id]
		let preset = JSON.parse(JSON.stringify(defaultPreset))

		// preset data
		preset.category = data.category || 'Common'
		preset.name = data.name || id

		// button style
		preset.style.text = data.text ?? data.name ?? ''
		if (data.color) preset.style.color = data.color
		if (data.bgcolor) preset.style.bgcolor = data.bgcolor

		// action data
		let actionId = data.id || id
		let options = data.options || {}
		preset.steps[0].down = [{ actionId, options }]

		presets[id] = preset
	})

	self.setPresetDefinitions(presets)
}

const defaultPreset = {
	type: 'button',
	category: '',
	name: '',
	style: {
		text: '',
		size: 'auto',
		color: combineRgb(255, 255, 255),
		bgcolor: combineRgb(0, 0, 0),
	},
	steps: [{ down: [], up: [] }],
}
