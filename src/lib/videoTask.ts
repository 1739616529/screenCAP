export interface HVGAItem {
	video_bit: number
	audio_bit: number
}
export interface Options extends HVGAItem {
	system_audio: boolean // 系统音量
	external_audio: boolean // 麦克风音量
	HVGA: HVGA // 清晰度
	HVGA_type: string //视频类型
	custom_HVGA_type?: string // 自定义视频类型
}

export interface HVGAList {
	'480p': HVGAItem
	'720p': HVGAItem
	'1080p': HVGAItem
}
export type HVGA = keyof HVGAList

export interface VideoTypeItem<T> {
	label: T
	value: T
}
export type VideoTypeList = [
	{
		value: 'video/webm;codecs=vp9'
		label: 'video/webm;codecs=vp9'
	},
	{ value: 'video/webm'; label: 'video/webm' }
]
export type ErrCode = 0 | 1 | 2 | 3
export interface ErrorInfo {
	code: ErrCode
	msg: string
}
export type OnErrorFun =
	| ((error_info: ErrorInfo, rinning: boolean) => void)
	| undefined
export type OnEndFun = ((msg?: string) => void) | undefined
export type MessageCode = 0 | 1
export interface MessageInfo {
	code: MessageCode
	msg: string
}
export type OnMessageFun = ((msg: MessageInfo) => void) | undefined
export type OnStartFun = ((stream: MediaStream) => void) | undefined

export type OptionSet = <
	K extends keyof Options,
	V extends Options[K]
>(option: { [key in K]: V }) => void

export interface ToIndexDBInstance {
	name: string
	video: Blob
	time: Date
}

let err_msg_list: { [key: string]: ErrCode } = {
	'Permission denied': 1,
	'mediaDevices is not a function': 3,
}
export class VideoTask {
	private default_HVGA: HVGA
	readonly HVGAList: HVGAList
	readonly VideoTypeList: VideoTypeList
	private _option: Options
	private isAudit: Boolean = true
	private captureStream?: MediaStream
	private mediaRecorder?: MediaRecorder
	private _running: boolean = false
	private videoInstance?: ToIndexDBInstance
	/** 状态回调函数 */
	/**
	 * code = 0 不影响正常运行
	 * code = 1 无权限
	 * code = 2 需要提示报错
	 * code = 3 致命错误 功能无法运行
	 */
	onerror: OnErrorFun
	/** 结束 */
	onend: OnEndFun
	/** 开始 */
	onstart: OnStartFun
	/** 推送消息 */
	onmessage: OnMessageFun

	public get running() {
		return this._running
	}
	private stateCallback = {
		error: (msg: string, code: ErrCode = 0) => {
			let error_info: ErrorInfo = { code, msg }
			if (code === 0) {
				for (const v in err_msg_list) {
					if (msg.indexOf(v) !== -1) {
						error_info.code =
							err_msg_list[v]
						continue
					}
				}
			}
			if (error_info.code >= 2) {
				console.error(new Error(msg))
			}
			switch (error_info.code) {
				case 2:
					break
				case 3:
					this._running = false
					break
			}

			if (this.onerror)
				this.onerror(error_info, this._running)
		},

		start: (stream?: MediaStream) => {
			this._running = true
			if (this.onstart && stream) this.onstart(stream)
		},
		end: (msg?: string) => {
			this._running = false
			if (this.onend) this.onend(msg)
		},

		message: (msg: string, code: MessageCode = 1) => {
			if (this.onmessage) this.onmessage({ msg, code })
		},
	}
	constructor() {
		this.auditFunction() // 检车是否可以录制
		this.default_HVGA = '1080p'
		this.HVGAList = {
			'480p': { video_bit: 2800000, audio_bit: 64000 },
			'720p': { video_bit: 28000000, audio_bit: 72000 },
			'1080p': { video_bit: 280000000, audio_bit: 128000 },
		}
		this.VideoTypeList = [
			{
				value: 'video/webm;codecs=vp9',
				label: 'video/webm;codecs=vp9',
			},
			{ value: 'video/webm', label: 'video/webm' },
		]
		this._option = {
			system_audio: true,
			external_audio: true,
			video_bit: this.HVGAList[this.default_HVGA][
				'video_bit'
			],
			audio_bit: this.HVGAList[this.default_HVGA][
				'audio_bit'
			],
			HVGA: this.default_HVGA,
			HVGA_type: this.VideoTypeList[0].value,
		}
	}

	public async start() {
		this.auditFunction()
		if (this.isAudit === false) return
		if (this.captureStream) return

		try {
			await this.createVideoTask()
			this.createRecorder()
			this.stateCallback.start(this.captureStream)
		} catch (err) {
			this.stateCallback.error(String(err))
		}
	}

	public end() {
		if (!this.captureStream) return
		if (!this.mediaRecorder) return
		this.mediaRecorder.stop()
		const tast_list = this.captureStream.getTracks()
		tast_list.forEach((task) => task.stop())
		this.init()
	}

	private init() {
		this.captureStream = undefined
		this.mediaRecorder = undefined
	}

	public set option(option: Options) {
		this._option = option
	}

	public get option() {
		return this._option
	}

	private createVideoTask = async () => {
		this.captureStream = await this.getVideoMedia()
		console.log(this.option)
		console.log(this._option)
		if (this._option.external_audio) {
			const audioStram = await this.getAudioStrem()
			this.captureStream.addTrack(
				audioStram.getAudioTracks()[0]
			)
		}
	}

	private getVideoMedia() {
		return navigator.mediaDevices.getDisplayMedia({
			video: true,
			audio: false,
			// audio: this._option.system_audio,
		})
	}

	private getAudioStrem() {
		return navigator.mediaDevices.getUserMedia({
			video: false,
			audio: true,
		})
	}

	private createRecorder() {
		if (!this.captureStream)
			return this.stateCallback.error(
				'captureStream is undefined',
				3
			)

		let mime_type: string =
			this._option.custom_HVGA_type || this._option.HVGA_type

		const is_supper = this.isSupperVideoType(mime_type)

		if (!is_supper)
			return this.stateCallback.error(
				'Unsupported video format: ' + is_supper,
				3
			)

		this.mediaRecorder = new MediaRecorder(this.captureStream, {
			mimeType: mime_type,
			audioBitsPerSecond: this._option.audio_bit,
			videoBitsPerSecond: this._option.video_bit,
		})

		if (!this.mediaRecorder)
			return this.stateCallback.error(
				'mediaRecorder is undefined',
				3
			)

		this.mediaRecorder.ondataavailable = this.seveMediaToLocale
		this.mediaRecorder.start()
	}

	public isSupperVideoType(type: string): boolean {
		return MediaRecorder.isTypeSupported(type)
	}

	private seveMediaToLocale = (ev: BlobEvent) => {
		const downloadEl = document.createElement('a')
		downloadEl.href = URL.createObjectURL(ev.data)
		const nowDate = new Date()
		const file_name = nowDate.toLocaleString() + '.mp4'
		this.videoInstance = {
			name: file_name,
			video: ev.data,
			time: nowDate,
		}
		downloadEl.download = file_name
		downloadEl.click()
		URL.revokeObjectURL(downloadEl.href)
		downloadEl.remove()
		this.stateCallback.end()
	}

	private saveToIndexDB() {
		if (!this.videoInstance) return

		if (!window.indexedDB)
			return this.stateCallback.error(
				'indexDB is undefined',
				3
			)
	}

	private auditFunction() {
		const logError = (
			msg: string = 'mediaDevices is not a function'
		) => {
			this.isAudit = false
			this.stateCallback.error(msg)
		}
		try {
			if (!window.navigator.mediaDevices) logError()
		} catch (err) {
			logError()
		}
	}
}
