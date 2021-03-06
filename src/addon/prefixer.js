'use strict'

import { addPrefix } from '../helper'

const addOn = function (renderer) {
	if (renderer.put) {
		const put = renderer.put
		renderer.put = (selector, decls, atRule) =>
			put(selector, addPrefix(decls), atRule)
	}

	if (renderer.keyframes) {
		const keyframes = renderer.keyframes
		renderer.keyframes = (decls, name) => keyframes(addPrefix(decls), name)
	}

	if (renderer.virtual) {
		renderer.prefixer = addPrefix
	}
}

export default addOn
