import { createContext, useContext } from 'react'
import { HomeStore } from './home'
function createStores() {
	return {
		HomeStore,
	}
}

const stores = createStores()

const StoresContext = createContext(stores)

const getStores = () => useContext(StoresContext)

function useHomeStore() {
	const { HomeStore } = getStores()
	return HomeStore
}

export { stores, useHomeStore, StoresContext }
