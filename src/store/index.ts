import { createContext, useContext } from 'react'
import rootStore, { RootStore } from './module'
import homeStore, { HomeStore } from './module/home'
export interface Stores {
	HomeStore: HomeStore
	RootStore: RootStore
}
function createAppStore(): Stores {
	return {
		HomeStore: homeStore,
		RootStore: rootStore,
	}
}

const appStores = createAppStore()
const StoreContext = createContext(appStores)
const getStores = () => useContext(StoreContext)
const useStore = () => {
	return getStores()
}
export { appStores, StoreContext, useStore }
