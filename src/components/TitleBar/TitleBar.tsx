
import { observer } from "mobx-react"
import { useStore } from "src/store"
import React from "react"
export interface TopMenuItem {
	label: string, icon: string, value: string
}
function TitleBar(): JSX.Element {
	const { count } = useStore()['HomeStore']

	const top_menus: TopMenuItem[] = [
		{ label: '2', icon: '', value: 'setting' }
	]

	console.log('titlebar')

	function top_menu_click(item: TopMenuItem): void {
		console.log(item)
	}
	return (
		<div className="bg-blue-700">
			<div className="h-14 m-auto max-w-6xl w-full relative select-none font-medium text-white  text-center" style={{ 'lineHeight': '3.5rem' }}>
				screenCAP
				<div className="absolute top-0 bottom-0 right-0 flex  items-center" style={{ 'paddingRight': '15px' }}>
					{top_menus.map(v => (
						<div tabIndex={0} key={v.value} className="cup rounded-full bg-white bg-opacity-0 hover:bg-opacity-25 focus:bg-opacity-50 h-8 w-8 leading-loose" onClick={() => top_menu_click(v)}>
							{v.label + v.icon}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default observer(TitleBar)