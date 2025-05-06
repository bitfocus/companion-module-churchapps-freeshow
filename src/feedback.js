const { combineRgb } = require('@companion-module/base')

const WhiteColor = combineRgb(255, 255, 255)
const GreenColor = combineRgb(5, 115, 50)

// TODO:
// variable/dynamic value is value
// output style with name X set in output with name Y
// show with name X active

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
	}

	self.setFeedbackDefinitions(feedbacks)
}
