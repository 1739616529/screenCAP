import React, { useState, Fragment, useRef, useEffect } from "react"
import TitleBar from "src/components/TitleBar/TitleBar"
import { observer } from "mobx-react"
import { useStore } from 'src/store'
import { dark_theme_state } from 'src/util/darkTheme'
import { VideoTask, OptionSet, Options } from 'src/lib/videoTask'
import Button from 'src/components/Button/Button'
import Switch, { SwitchEvent } from "src/components/Switch/Switch"
function Home(): JSX.Element {
	const videoTask = new VideoTask()
	const { count_list, filter_count_list } = useStore()['RootStore']
	let videoEl: HTMLVideoElement | undefined
	const [options, set_options] = useState(videoTask.getOption)
	function get_show_video_el(): HTMLVideoElement {
		if (!videoEl) videoEl = document.getElementById('show-video') as HTMLVideoElement
		return videoEl
	}

	function set_options_fun<K extends keyof Options, V extends Options[K]>(option: { [key in K]: V }) {
		set_options((state) => {
			const newState = { ...state, ...option }
			videoTask.setOption = newState
			return newState
		})
	}

	/** 监听开始 返回当前视频流 */
	videoTask.onstart = function (stream) {
		get_show_video_el().srcObject = stream
	}

	videoTask.onerror = function (msg) {
		console.log('↓↓↓↓↓↓↓↓↓↓↓     ERROR     ↓↓↓↓↓↓↓↓↓↓↓')
		console.log(msg)
	}

	videoTask.onend = function (msg) {
		console.log(msg)
		get_show_video_el().srcObject = null
	}

	function start_fun() {
		videoTask.start()
	}

	function end_fun() {
		videoTask.end()
	}


	function changeState(state: boolean) {
		console.log(state)
	}

	function changeState1(state: boolean) {
		console.log(state)
	}



	return (
		<div className="Home w-full h-full flex flex-col">
			<TitleBar />
			<div className="w-full flex-1 flex max-w-6xl m-auto" style={{ 'padding': '10px' }}>

				<div className="md:w-9/12 h-full w-full flex flex-col">
					<div className="h-3/5">
						<video muted autoPlay className="w-full h-full" id="show-video" />
					</div>
					<div className="flex-1">
						<Button onClick={start_fun}>开始</Button>
						<Button onClick={end_fun}>结束</Button>
						<Switch onChange={changeState} text="123" checked />
						<Switch onChange={changeState1} text="456" checked />

					</div>
				</div>
				<div className="text-gray-300">test</div>



			</div>


		</div >
	)
}
export default observer(Home)