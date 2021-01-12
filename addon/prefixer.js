'use strict'

const { prefix: prefixAll } = require('inline-style-prefixer')
const { camelCaseProperty } = require('css-in-js-utils')
const R = require('rambda')

exports.addon = function (renderer) {
	const put = renderer.put

	renderer.put = function withPrefixer(selector, decls, atRule) {
		const prefixedDecl = R.pipe(
			Object.entries,
			R.map(([prop, value]) => [camelCaseProperty(prop), value]),
			Object.fromEntries,
			prefixAll
		)(decls)

		console.log('check prefix result', prefixedDecl)

		put(selector, prefixedDecl, atRule)
	}
}
