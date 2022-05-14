/** 防抖 */
export function debounce(fn: Function, delay: number = 500) {
	let timer: number | null = null

	return function (this: unknown, ...args: any[]) {
		if (timer !== null) clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}

/** 节流 */
export function throttle(fn: Function, delay: number = 500) {
	let isOK: boolean = true
	return function (this: unknown, ...args: any[]) {
		if (isOK) fn.apply(this, args)
		setTimeout(() => {
			isOK = false
		}, delay)
	}
}
