import { makeAutoObservable } from 'mobx'

export class HomeStore {
	count: number = 30
	constructor() {
		makeAutoObservable(this)
	}

	add_count = () => {
		this.count++
	}
}
export default new HomeStore()
