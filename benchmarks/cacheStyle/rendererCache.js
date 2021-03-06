'use strict'
import {
	assembleClassName,
	assembleRule,
	assembleDecl,
	isAtRule,
	cssifyArray,
	cssifyObject
} from '../../src/helper'
import safeIsObj from 'safe-is-obj'

const addOn = function (renderer) {
	// Setting the cache outside this function may result in more persistant but unexpected behaviors
	renderer.cache = {}
	// This can should be used for validating against 1) Rules generated with virtua()/atomic() 2) Rules received from hydration()

	const objectToClassNames = (decls, selector = '', atRule = '') => {
		let classNames = ''
		for (const prop in decls) {
			const value = decls[prop]
			const id = `${atRule}${selector}${prop}${value}`

			if (renderer.cache[id]) {
				classNames += renderer.cache[id]
				continue
			}

			if (Array.isArray(value)) {
				classNames += renderer.cache[id] = ` ${renderer.atomic(
					cssifyArray(prop, value)
				)}`
			} else if (safeIsObj(value)) {
				if (isAtRule(prop)) {
					classNames += objectToClassNames(value, '', prop)
					continue
				}
				classNames += objectToClassNames(value, prop)
			} else {
				const prefixedRawDecls = renderer.prefixer
					? cssifyObject(renderer.prefixer({ [prop]: value }))
					: assembleDecl(prop, value)

				classNames += renderer.cache[id] = ` ${renderer.atomic(
					prefixedRawDecls,
					selector,
					atRule
				)}`
			}
		}
		return classNames
	}

	renderer.atomic = function (rawDecl, selector = '', atRule = '') {
		const className = assembleClassName(renderer)

		const rule = assembleRule(`.${className}${selector}`, rawDecl)

		renderer.putRaw(atRule ? assembleRule(atRule, rule) : rule)

		return className
	}

	// Only media queries should be supported in virtual
	renderer.virtual = (decls) => objectToClassNames(decls)

	renderer.rule = renderer.virtual
}

export default addOn
