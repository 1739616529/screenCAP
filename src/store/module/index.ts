import { makeAutoObservable } from 'mobx'
type count_list = number[]
export class RootStore {
	count_list: count_list = [1, 2, 3, 4, 5, 6]
	constructor() {
		makeAutoObservable(this)
	}

	filter_count_list = (): count_list => {
		return this.count_list.filter((v) => v % 2 === 0)
	}
}
export default new RootStore()
