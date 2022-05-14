import React, { useRef } from "react"
export interface SwitchProps {
	onChange: (state: boolean) => void
	text: string
	checked?: boolean
}
export interface SwitchEvent extends React.ChangeEvent<HTMLInputElement> { }
export default function Switch(props: SwitchProps) {
	function changhe_value(e: SwitchEvent) {
		props.onChange(e.target.checked)
	}
	const input = useRef<HTMLInputElement>(null)

	function handle_change() {
		if (input.current) {
			input.current.checked = !input.current.checked
			props.onChange(input.current.checked)
		}
	}

	function create_className(...args: string[]) {
		return args.join(' ')
	}
	return (<div className="inline-flex relative items-center mr-5 cursor-pointer select-none" onClick={handle_change}>
		<input ref={input} {...props} className="sr-only peer" onChange={changhe_value} type="checkbox" />
		<div className="w-11 h-6 bg-gray-200 rounded-full   peer-checked:ring-4 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-700"></div>
		<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" >{props.text}</span>
	</div >)
}