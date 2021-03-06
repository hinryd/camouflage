/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addonRule from '../src/addon/rule'
import addonCache from '../src/addon/cache'
import addonJsx from '../src/addon/jsx'

function createNano(config) {
	const nano = create(config)

	addonRule(nano)
	addonCache(nano)
	addonJsx(nano)

	return nano
}

describe('jsx()', function () {
	it('installs interface', function () {
		const nano = createNano()

		expect(typeof nano.jsx).toBe('function')
	})

	it('creates a styling block', function () {
		const nano = createNano()
		const Comp = nano.jsx('button', { color: 'red' })

		expect(typeof Comp).toBe('function')
	})
})
