let db: IDBDatabase | undefined

let state = 10

function set_state() {
	console.log(1)
}

function useIndexDB() {
	return [state, set_state]
}

export {}
