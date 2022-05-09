import { observable, computed, action } from 'mobx'

export class HomeStore {
	@observable
	count: number = 10

	@computed computed_count(val: number): boolean {
		return this.count > val
	}

	@action add_count(val?: number) {
		if (val) return (this.count += val)
		this.count++
	}

	@action mniu_count(val?: number) {
		if (val) return (this.count -= val)
		this.count--
	}
}
