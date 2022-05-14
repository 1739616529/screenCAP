import React, { useState, Fragment, useRef, useEffect } from "react"
import TitleBar from "src/components/TitleBar/TitleBar"
import { observer } from "mobx-react"
import { useStore } from 'src/store'
import { dark_theme_state } from 'src/util/darkTheme'
import { VideoTask, OptionSet, Options, HVGAList } from 'src/lib/videoTask'
import Button from 'src/components/Button/Button'
import Switch, { SwitchEvent } from "src/components/Switch/Switch"
import Select from "src/components/Select/Select"
function Home(): JSX.Element {
	const videoTask = new VideoTask()
	const { count_list, filter_count_list } = useStore()['RootStore']
	let videoEl: HTMLVideoElement | undefined
	const [options, set_options] = useState(videoTask.option)
	const [extra_option_model, set_extra_option_model] = useState(false)
	function get_show_video_el(): HTMLVideoElement {
		if (!videoEl) videoEl = document.getElementById('show-video') as HTMLVideoElement
		return videoEl
	}

	function set_options_fun<K extends keyof Options, V extends Options[K]>(option: { [key in K]: V }) {
		const new_state = { ...options, ...option }
		set_options({ ...new_state })
		videoTask.option = { ...new_state }
		console.log(videoTask.option)
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


	return (
		<div className="Home w-full h-full flex flex-col">
			<TitleBar />
			<div className="w-full flex-1 flex max-w-6xl m-auto" style={{ 'padding': '10px' }}>

				<div className="md:w-9/12 h-full w-full flex flex-col">
					<div className="h-3/5">
						<video muted autoPlay className="w-full h-full" id="show-video" />
					</div>
					<div className="flex-1">
						<select onChange={(e) => {
							set_options_fun({ HVGA: e.target.value as keyof HVGAList })
						}} defaultValue={'1080p'} className="bg-gray-50 border w-auto inline-block border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mr-2  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							{Object.keys(videoTask.HVGAList).map((v) => (
								<option value={v} key={v}>{v}</option>
							))}
						</select>
						<Button onClick={start_fun}>开始</Button>
						<Button onClick={end_fun}>结束</Button>
						<Button onClick={() => {
							set_extra_option_model(!extra_option_model)
						}} className="peer bg-white border text-black hover:bg-gray-100 ring-gray-200">高级设置</Button>
						<div className={(extra_option_model ? "h-auto p-1 pt-3" : 'h-0') + " transition  overflow-hidden "} >
							<Switch checked={options.system_audio} text="只系统声音" onChange={(e) => {
								set_options_fun({ system_audio: e })
							}} />
							<Switch checked={options.external_audio} text="系统声音和麦克风声音" onChange={(e) => {
								set_options_fun({ external_audio: e })
							}} />
						</div>
					</div>
				</div>
				<div className="text-gray-300">test</div>



			</div>


		</div >
	)
}
export default observer(Home)