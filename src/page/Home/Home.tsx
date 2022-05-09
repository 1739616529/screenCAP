import React, { useCallback, useState as use_state } from "react"
import TitleBar from "../../components/TitleBar"
import { inject, observer } from "mobx-react"
const Home = (): JSX.Element => {
	const [count, set_count] = use_state({ aaa: '10' })
	function change_count(state: default_obj) {
		set_count((oneself) => {
			return { ...oneself, ...state }
		})
	}
	function children_emit(val: string) {
		console.log(val)
	}
	const callback = useCallback(() => {
		console.log(count, 'useCallback')
	}, [count])
	callback()
	return (
		<div className="Home">
			Home Page
			<TitleBar name={count.aaa} emit={children_emit} />
			<button onClick={() => {
				change_count({ aaa: '真的' })
			}} >点击切换 {count.aaa}</button>
		</div>
	)
}
export default Home