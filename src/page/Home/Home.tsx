import React, { useState } from "react"
import TitleBar from "@/components/TitleBar"
import { observer } from "mobx-react"
import { useStore } from '@/store'
function Home(): JSX.Element {
	const { count_list, filter_count_list } = useStore()['RootStore']
	const [count, set_count] = useState(count_list.length)
	function test_btn() {
		set_count(() => {
			return filter_count_list().length
		})
	}

	const people = [
		{
			name: 'Calvin Hawkins',
			email: 'calvin.hawkins@example.com',
			image:
				'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		{
			name: 'Kristen Ramos',
			email: 'kristen.ramos@example.com',
			image:
				'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		{
			name: 'Ted Fox',
			email: 'ted.fox@example.com',
			image:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
	]

	return (
		<div className="Home">
			Home Page
			<TitleBar />
			<p>{count}</p>
			<button onClick={test_btn} >点击切换 </button>
			{people.map((person) => (
				<li key={person.email} className="py-4 flex">
					<img className="h-10 w-10 rounded-full" src={person.image} alt="" />
					<div className="ml-3">
						<p className="text-sm font-medium text-gray-900">{person.name}</p>
						<p className="text-sm text-gray-500">{person.email}</p>
					</div>
				</li>
			))}
		</div>
	)
}
export default observer(Home)