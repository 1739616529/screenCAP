interface props {
	name: string,
	emit: (val: string) => void
}
import React, { useContext, useEffect } from "react"
import { ThemeContext } from '@/context/index'
export default function (props: props): JSX.Element {
	// useEffect(() => {
	// 	console.log('aaa')
	// }, [])
	// const val = useContext(ThemeContext)
	// console.log(val)
	return (
		<div className="Title-bar">
			<span onClick={() => props.emit('已经触发')}>
				{props.name}</span>
		</div>
	)
}