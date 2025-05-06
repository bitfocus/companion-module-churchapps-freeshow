const { combineRgb } = require('@companion-module/base')

const WhiteColor = combineRgb(255, 255, 255)
const BlackColor = combineRgb(0, 0, 0)
const GreenColor = combineRgb(5, 115, 50)
const BlueColor = combineRgb(0, 25, 60)
const RedColor = combineRgb(100, 8, 8)

module.exports = function (self) {
	const presetData = {
		// COMMON
		previous_slide: {
			name: 'Previous slide',
			text: '❮',
			bgcolor: GreenColor,
		},
		next_slide: {
			name: 'Next slide',
			text: '❯',
			bgcolor: GreenColor,
		},
		next_project_item: {
			name: 'Next project item',
			text: '⬇️',
			bgcolor: BlueColor,
		},
		previous_project_item: {
			name: 'Previous project item',
			text: '⬆️',
			bgcolor: BlueColor,
		},
		clear_all: {
			name: 'Clear all',
			text: '✖',
			bgcolor: RedColor,
			feedback: { id: 'layer_active', options: { layer: 'any' } },
		},
		lock_output: {
			name: 'Toggle output lock',
			text: '🔒',
			bgcolor: RedColor,
		},

		// CLEAR
		clear_all_2: {
			category: 'Clear',
			id: 'clear_all',
			name: 'Clear All',
			bgcolor: RedColor,
			feedback: { id: 'layer_active', options: { layer: 'any' } },
		},
		clear_background: {
			category: 'Clear',
			name: 'Clear Background',
			text: 'Clear BG',
			bgcolor: RedColor,
			feedback: { id: 'layer_active', options: { layer: 'background' } },
		},
		clear_slide: {
			category: 'Clear',
			name: 'Clear Slide',
			bgcolor: RedColor,
			feedback: { id: 'layer_active', options: { layer: 'slide' } },
		},
		clear_overlays: {
			category: 'Clear',
			name: 'Clear Overlays',
			bgcolor: RedColor,
			feedback: { id: 'layer_active', options: { layer: 'overlays' } },
		},
		clear_audio: {
			category: 'Clear',
			name: 'Clear Audio',
			bgcolor: RedColor,
			feedback: { id: 'layer_active', options: { layer: 'audio' } },
		},
		clear_next_timer: {
			category: 'Clear',
			name: 'Clear Next slide timer',
			bgcolor: RedColor,
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

	// prettier-ignore
	const BIBLE_BOOKS = [
		'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
		'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation',
	]
	const COLORS = [
		{ index: 0, color: combineRgb(232, 56, 66) },
		{ index: 5, color: combineRgb(232, 127, 66) },
		{ index: 17, color: combineRgb(181, 56, 232) },
		{ index: 22, color: combineRgb(66, 192, 77) },
		{ index: 39, color: combineRgb(66, 176, 232) },
		{ index: 44, color: combineRgb(232, 172, 66) },
		{ index: 65, color: combineRgb(232, 56, 229) },
	]
	// GENERATE BIBLE BOOKS
	for (let i = 0; i < Object.keys(BIBLE_BOOKS).length; i++) {
		const bookName = BIBLE_BOOKS[i]
		const bookColor = JSON.parse(JSON.stringify(COLORS))
			.reverse()
			.find((a) => a.index <= i)?.color
		const bookId = bookName.toLowerCase().replaceAll(' ', '_')
		const options = { key: 'bible_book', value: (i + 1).toString() }

		presetData['bible_book_' + bookId] = {
			category: 'Bible books',
			id: 'set_self_variable',
			name: `Select a Bible book`,
			text: bookName,
			bgcolor: bookColor,
			options,
			feedback: { id: 'internal_variable', options },
			extraActions: [
				{ actionId: 'set_self_variable', options: { key: 'bible_chapter', value: '' } },
				{ actionId: 'set_self_variable', options: { key: 'bible_verse', value: '' } },
			],
		}
	}

	// GENERATE BIBLE CHAPTERS
	// second most is Isaiah with 66 chapters
	for (let i = 0; i < 150; i++) {
		const chapterName = (i + 1).toString()
		const options = { key: 'bible_chapter', value: chapterName }

		presetData['bible_chapter_' + i] = {
			category: 'Bible chapters',
			id: 'set_self_variable',
			name: `Select a Bible chapter`,
			text: chapterName,
			options,
			feedback: { id: 'internal_variable', options },
			extraActions: [{ actionId: 'set_self_variable', options: { key: 'bible_verse', value: '' } }],
		}
	}

	// GENERATE BIBLE VERSES
	// second most is Number 7 with 89 verses
	for (let i = 0; i < 176; i++) {
		const verseName = (i + 1).toString()
		const options = { key: 'bible_verse', value: verseName }

		presetData['bible_verse_' + i] = {
			category: 'Bible verses',
			id: 'start_scripture',
			name: `Select a Bible verse`,
			text: verseName,
			options: { value: '$(bible_book).$(bible_chapter).' + verseName },
			feedback: { id: 'internal_variable', options },
			extraActions: [{ actionId: 'set_self_variable', options }],
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

		// feedback
		if (data.feedback) {
			data.feedback.feedbackId = data.feedback.id
			delete data.feedback.id
			if (!data.feedback.style) {
				data.feedback.style = {
					color: WhiteColor,
					bgcolor: GreenColor,
				}
			}
			preset.feedbacks = [data.feedback]
		}

		// extra actions
		if (data.extraActions) preset.steps[0].down.push(...data.extraActions)

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
		color: WhiteColor,
		bgcolor: BlackColor,
	},
	steps: [{ down: [], up: [] }],
}
