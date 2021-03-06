/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addonRule from '../src/addon/rule'

function createNano(config) {
	const nano = create(config)
	addonRule(nano)
	return nano
}

describe('array', function () {
	it('installs without crashing', function () {
		const nano = createNano()
		expect(nano).toBeDefined()
	})

	it('handles array values correctly', function () {
		const nano = createNano()

		nano.putRaw = jest.fn()

		nano.put('.one', {
			display: ['flex', '-webkit-flex']
		})

		expect(nano.putRaw).toHaveBeenCalledTimes(1)
		const result = nano.putRaw.mock.calls[0][0].replace(/[\s\n]+/g, '')
		expect(result).toBe('.one{display:flex;display:-webkit-flex;}')
	})
})
