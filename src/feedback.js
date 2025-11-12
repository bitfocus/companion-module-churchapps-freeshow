const { combineRgb } = require('@companion-module/base')

const WhiteColor = combineRgb(255, 255, 255)
const GreenColor = combineRgb(5, 115, 50)
const parseBoolean = (value) => {
	if (typeof value === 'boolean') return value
	if (typeof value === 'number') return value !== 0
	if (typeof value === 'string') {
		const lowered = value.trim().toLowerCase()
		if (lowered === 'true' || lowered === '1' || lowered === 'enabled' || lowered === 'on') {
			return true
		}
	}
	return false
}

module.exports = function (self) {
	const feedbacks = {
		layer_active: {
			type: 'boolean',
			name: 'Layer is active',
			description: 'If a specific output layer is active',
			defaultStyle: {
				color: WhiteColor,
				bgcolor: GreenColor,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Layer',
					id: 'layer',
					default: 'any',
					choices: [
						{ id: 'any', label: 'Any layer' },
						{ id: 'background', label: 'Background' },
						{ id: 'slide', label: 'Slide' },
						{ id: 'overlays', label: 'Overlay' },
						{ id: 'audio', label: 'Audio' },
					],
				},
			],
			callback: (feedback) => {
				const layers = (self.variableData?.active_layers || '').split(', ').filter(Boolean)
				const layer = feedback.options.layer
				if (layer === 'any') return !!layers.length
				return layers.includes(layer)
			},
		},
		style_active: {
			type: 'boolean',
			name: 'Style is active',
			description: 'If a specific output style is used in an output',
			defaultStyle: {
				color: WhiteColor,
				bgcolor: GreenColor,
			},
			options: [
				{
					type: 'textinput',
					label: 'Style name',
					id: 'name',
				},
			],
			callback: (feedback) => {
				const formatName = (name) => name.toLowerCase()
				return !!(self.variableData?.active_styles || '')
					.split(', ')
					.find((name) => formatName(name) === formatName(feedback.options.name))
			},
		},
		slide_number: {
			type: 'boolean',
			name: 'Slide number',
			description: 'If slide is set number',
			defaultStyle: {
				color: WhiteColor,
				bgcolor: GreenColor,
			},
			options: [
				{
					type: 'number',
					label: 'Slide number',
					id: 'slide_number',
					default: 1,
					min: 1,
					max: 1000,
					range: false,
				},
			],
			callback: (feedback) => {
				return Number(self.variableData?.slide_number || 0) === feedback.options.slide_number
			},
		},
		internal_variable: {
			type: 'boolean',
			name: 'Custom variable is value (internal)',
			description: 'If custom variable is a specific value',
			defaultStyle: {
				color: WhiteColor,
				bgcolor: GreenColor,
			},
			options: [
				{
					type: 'textinput',
					label: 'Variable name',
					id: 'key',
				},
				{
					type: 'textinput',
					label: 'Variable value',
					id: 'value',
				},
			],
			callback: (feedback) => {
				if (self.internalVariable?.[feedback.options.key] === undefined) return false
				return self.internalVariable?.[feedback.options.key] === feedback.options.value
			},
		},
		log_song_usage_enabled: {
			type: 'boolean',
			name: 'Log song usage enabled',
			description: 'If FreeShow is logging song usage',
			defaultStyle: {
				color: WhiteColor,
				bgcolor: GreenColor,
			},
			options: [],
			callback: () =>
				parseBoolean(
					self.variableData?.log_song_usage !== undefined
						? self.variableData?.log_song_usage
						: self.variableData?.logSongUsage
				),
		},
	}

	self.setFeedbackDefinitions(feedbacks)
}
