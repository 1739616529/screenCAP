
import { observer } from "mobx-react"
import { useStore } from "@/store"
import React, { useContext, useEffect } from "react"
function TitleBar(): JSX.Element {
	const { count } = useStore()['HomeStore']
	return (
		<div className="Title-bar">
			titleBar: {count}
		</div>
	)
}

export default observer(TitleBar)