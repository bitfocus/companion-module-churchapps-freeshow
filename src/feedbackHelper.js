function normalizeValue(value) {
	if (value === undefined || value === null) return ''
	return String(value).trim().toLowerCase()
}

// timer & variable dynamic value names uses this
function getLabelId(label) {
	if (!label) return ''

	label = label
		.toLowerCase()
		.replace(/x[0-9]/g, '') // x0-9
		.replace(/[[\]]/g, '') // []
		.replace(/['":]/g, '') // '":
		.trim()
		.replaceAll(' ', '_') // " " -> _
		.replaceAll('-', '_') // - -> _

	if (label.endsWith('_')) label = label.slice(0, -1)

	return label
}

// TIMER

export function isTimerInState(value, state) {
	const normalized = normalizeValue(value)
	if (!normalized || normalized === 'n/a') return false

	const isPlaying = normalized === 'playing' || normalized === 'play' || normalized === 'running'
	const isPaused = normalized === 'paused' || normalized === 'pause'
	const isStopped =
		normalized === 'stopped' || normalized === 'stop' || normalized === 'inactive' || normalized === 'false'

	if (state === 'playing') return isPlaying
	if (state === 'paused') return isPaused
	if (state === 'stopped') return isStopped

	return isPlaying || isPaused
}

export function resolveTimerStatus(variableData, timerName) {
	if (!variableData) return undefined

	const name = getLabelId(normalizeValue(timerName))
	if (!name) return variableData.timer_status

	const dynamicKey = name.startsWith('timer_') ? name : `timer_${name}`
	const statusKey = name.endsWith('_status') ? dynamicKey : `${dynamicKey}_status`
	if (variableData[statusKey] === undefined) return undefined

	return variableData[statusKey]
}
