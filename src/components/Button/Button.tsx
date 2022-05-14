import React from "react"
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> { }
export default function Button(props: ButtonProps): JSX.Element {

	function create_className(...args: any[]) {
		return args.join(' ')
	}
	return (
		<button type="button" {...props} className={create_className("text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 ring-0 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 outline-none dark:focus:ring-blue-800", props.className)}></button>
	)
}