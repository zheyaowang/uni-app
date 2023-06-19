<template>	<view class="seck-flex-y height_full">		<sk-navbar :title="navbarTitle"/>		<!-- seck-flex-fill seck-flex-y 自动沾满剩余高度 -->		<view class="seck-flex-fill seck-flex-y height_0 padding-tb-sm">			<!-- <scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y @scrolltolower="() => {}"> -->				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->				<view class="padding-tb-sm padding-lr-lg">					<view class="box-shadow round">						<view class="padding-tb-sm padding-lr-lg box-shadow-bottom seck-flex-y-center gap-sm">							<u--text text="事件信息" lines="1" size="16" blod color="#222"></u--text>						</view>						<!--多套一层，给padding-->						<view class="padding-lg seck-flex-y gap-sm">							<view class="seck-flex-y-center seck-flex-between" v-for="(item, index) in detailsData.eventInfo" :key="index">								<view>									<u--text :text="item.label" lines="1" size="13"  color="#666"></u--text>								</view>								<view class="">									<u--text :text="item.value" lines="1" size="13" blod color="#222"></u--text>								</view>							</view>						</view>					</view>				</view>				<view class="padding-tb-sm padding-lr-lg">					<view class="box-shadow round">						<view class="padding-tb-sm padding-lr-lg box-shadow-bottom seck-flex-y-center gap-sm">							<u--text text="处理状态" lines="1" size="16" blod color="#222"></u--text>						</view>						<!--多套一层，给padding-->						<view class="padding-lg seck-flex-y gap-sm">							<view class="seck-flex-y-center seck-flex-between">								<view>									<u--text text="处理状态" lines="1" size="13"  color="#666"></u--text>								</view>								<view class="">									<u-radio-group v-model="detailsData.handleState">										<u-radio											:customStyle="{marginRight: '16px'}"											v-for="(item, index) in form.handleStateOptions"											:key="index"											:label="item.name"											:name="item.name"										>										</u-radio>									</u-radio-group>								</view>							</view>						</view>					</view>				</view>				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->				<view class="padding-tb-sm padding-lr-lg">					<view class="box-shadow round">						<view class="padding-tb-sm padding-lr-lg box-shadow-bottom seck-flex-y-center gap-sm">							<u--text text="事件内容" lines="1" size="16" blod color="#222"></u--text>						</view>										<view v-if="detailsData.content" class="padding-lr-lg padding-tb-lg">							<u-skeleton								rows="1"								:title="false"								:rowsWidth="['100%', '100%', '100%']"								:rowsHeight="['15px', '15px', '15px']"								:loading="skeletonLoading"							>								<view>									<u--text :text="detailsData.content" lines="10" size="13"  color="#666"></u--text>								</view>							</u-skeleton>						</view>
						
						<view v-if="!detailsData.content" class="padding-lr-lg padding-tb-lg">
							<u-empty mode="data"/>
						</view>					</view>				</view>				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->				<view class="padding-tb-sm padding-lr-lg">					<view class="box-shadow round">						<view class="padding-tb-sm padding-lr-lg box-shadow-bottom seck-flex-y-center gap-sm">							<u--text text="相关附件" lines="1" size="16" blod color="#222"></u--text>						</view>										<view v-if="detailsData.medias.length || detailsData.audios.length" class="seck-flex-y gap-lg  padding-lr-lg padding-tb-lg">
							<file-upload v-model="detailsData.medias" :max="20" :remove="false" :add="false"/>							<custom-audio v-for="(item, index) in detailsData.audios" :key="index" :title="item.name" :audio="item.url"></custom-audio>						</view>
						<view v-else class="seck-flex-y gap-lg  padding-lr-lg padding-tb-lg">
							<u-empty mode="data"/>
						</view>						<u-gap height="30rpx"></u-gap>					</view>				</view>				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->				<view class="padding-tb-sm padding-lr-lg" v-for="(item, index) in form.model" :key="index">					<view class="box-shadow round">						<view class="padding-tb-sm padding-lr-lg box-shadow-bottom seck-flex-y-center gap-sm">							<u--text text="处理内容" lines="1" size="16" blod color="#222"></u--text>						</view>						<!-- 不加u-gap占位组件就需要再套一层view设置样式margin-top,margin-bottom -->						<u--form labelPosition="top" :model="item" :rules="form.rules" :ref="'uForm' + index" errorType="message" class="padding-lr-lg padding-tb-lg">							<u-form-item label="" prop="description" labelWidth="80" borderBottom>								<u--textarea v-model="item.description" placeholder="请描述处理内容" ></u--textarea>							</u-form-item>							<u-form-item label="图片/视频" prop="fileList" labelWidth="80" borderBottom>								<!-- <seck-upload :file-list.sync="item.imagesFileList" @on-success="fileChange" @on-delete="fileChange" desc="最多可上传6张照片或者视频" class="margin-top-lg"></seck-upload> -->								<!-- <file-upload :max="9" v-model="item.fileList" mediaType="all" :chooseNum="9" :sourceType="['album','camera']"									:compress="false" :quality="80" :formData="{}" :remove="true"									@uploadSuccess="(res) => ceshiUploadSuccess1(res, index)" @imgDelete="(e) => ceshiImgDelete(e, item)" @uploadFail="ceshiUploadFail"									/>		 -->		
											
								<view style="display: flex;width: 100%;align-items: center;flex-direction: row;flex-wrap: wrap;">
									<file-upload v-model="item.fileList" :max="9" :remove="true" :add="false"  @imgDelete="(e) => deleteFile(e, item)"/>
									<!-- 组件是窗口级滚动，不要在scroll-view内使用 -->
									<lsj-upload ref="fileUploadRef" :childId="guid()"
										:option="option"
										:size="size" 
										:formats="formats" 
										:debug="debug" 
										:instantly="instantly" 
										:width="width"
										:height="height"
										@change="onChange"
										@progress="onprogress" 
										@uploadEnd="onuploadEnd"
										@merged="(e) => callMerged(e, item)"
										>
										<view class="htz-image-upload-Item htz-image-upload-Item-add">
											+
										</view>
									</lsj-upload>
								</view>							</u-form-item>							<!-- <u-form-item label="视频" prop="fileList" labelWidth="80" borderBottom>								<seck-upload accept="video" :file-list.sync="item.videosFileList" @on-success="fileChange" @on-delete="fileChange" desc="最多可上传6张照片或者视频" class="margin-top-lg"></seck-upload>							</u-form-item> -->							<u-form-item label="处理时间" prop="handleTime" labelWidth="80" borderBottom @click="form.showCalendar = true;activeHandleTimeIndex = index; hideKeyboard();" >								<u--input v-model="item.handleTime" disabled placeholder="请选择处理时间" border="none" ></u--input>								<u-icon slot="right" name="arrow-right"></u-icon>							</u-form-item>							<!-- <u-form-item label="处理状态" prop="handleState" labelWidth="80" borderBottom ref="handleState">								<u-radio-group v-model="item.handleState" slot="right">									<u-radio										:customStyle="{marginRight: '16px'}"										v-for="(item, index) in form.handleStateOptions"										:key="index"										:label="item.name"										:name="item.name"									>									</u-radio>								</u-radio-group>							</u-form-item> -->						</u--form>						<u-gap height="20rpx"></u-gap>					</view>				</view>
				<u-gap height="50px"></u-gap>
				<u-button type="primary" text="确定" @click="showModal = true" style="position: fixed; bottom: 0;z-index: 1024;"></u-button>
								<!--弹框组件必须写在滚动组件之下，不然会占高度-->				<!-- mode = single, multiple, range -->				<u-calendar					:show="form.showCalendar"					mode="single"					@confirm="(e) => calendarConfirm(e)"					@close="form.showCalendar = false"					confirmDisabledText="请选择处理日期"					:formatter="formatter"				></u-calendar>
				<u-toast ref="uToast"></u-toast>			<!-- </scroll-view> -->		</view>		<!-- 模态框 -->
		<sk-modal :show.sync="showModal" title="温馨提示" content="确定要提交信息吗？" @confirm="confirm"></sk-modal>	</view></template><script>	import SeckUpload from '@/pages/components/sk-upload/index.vue'	import CustomAudio from '@/pages/components/custom-audio/index.vue'	import { getProRepair_YHDetails, getProRepair_YH_UPDATE } from '@/api/farm-work.js'	import { toDateString, isPlainObject, isArray } from 'xe-utils'
	import { guid, whichDate } from '@/common/util/tools.js'	import configService from '@/common/service/config.service.js';	import FileUpload from '@/pages/components/sk-file-upload/index.vue'
	import LsjUpload from '@/uni_modules/lsj-upload/components/lsj-upload/lsj-upload.vue'	import { TOKEN_NAME } from '@/common/util/constants';
	import { mapActions, mapGetters } from 'vuex'
		export default {		data() {			return {
				guid,				description: '', // 文本域描述内容				form: {					model: [], // 对应的prorepair_yh_afterList					rules: {						description: {							type: 'string',							required: true,							message: '请输入描述内容',							trigger: ['change','blur']						},						fileList: {							type: 'array',							min: 1,							required: true,							message: '请上传相关附件',							trigger: ['change','blur']						},						handleTime: {							type: 'string',							min: 2,							required: true,							message: '请选择处理时间',							trigger: ['change']						},						handleState: {							type: 'string',							required: true,							message: '请选择处理状态',							trigger: ['change','blur']						}					},					showCalendar: false, // 日期弹框显隐					handleStateOptions: [						{ name: '处理中', disabled: false, value: "1" },						{ name: '已完结', disabled: false, value: "2" }					],				}, 				param: {}, // 农事详情携带进来的参数
				activeHandleTimeIndex: null, // 当前点击的时间				detailsData: {					eventInfo: [						{ label: '事件信息', value: '' },						{ label: '处理开始时间：', value: '' },						{ label: '处理结束时间：', value: '' },						{ label: '处理人员：', value: '' },					],
					medias: [],
					audios: [],				}, // 详情事件信息数据				skeletonLoading: true, // 骨架状态
				navbarTitle: '' ,// 导航栏标题
				option: {
					url: `${configService.apiUrl}/file/chunk`,
					// 上传附件的key
					name: 'file',
					// 根据你接口需求自定义请求头,默认不要写content-type,让浏览器自适配
					header: {
						'Authorization': uni.getStorageSync(TOKEN_NAME)
					},
					// 根据你接口需求自定义body参数
					formData: {
						// 'orderId': 1000,
						// 'xuzhuan': '10086'
					},
					mergeUrl: `${configService.apiUrl}/file/merge`,
				},
				// 选择文件后是否立即自动上传，true=选择后立即上传
				instantly: true,
				// 必传宽高且宽高应与slot宽高保持一致
				width: '180rpx',
				height: '180rpx',
				// 限制允许上传的格式，空串=不限制，默认为空
				formats: 'jpg,jpeg,png,bmp,tiff,ai,cdr,eps,mp4,avi,mov',
				// 文件上传大小限制 m
				size: 1024,
				// 文件数量限制
				count: 2,
				// 是否打印日志
				debug: true,
				progress: null, // 上传文件的进度
				showLoading: null, // 原生弹框
				processingPersonnelOptions: [], // 处理人员options
				paddyNumberOptions: [], // 田地编号options
				showModal: false, // 模态框			}		},		components: { SeckUpload, CustomAudio, FileUpload, LsjUpload },
		computed: {
			...mapGetters({
				userInfo: 'login/userInfo'
			}),
		},		async onLoad() {
			// 这里要先等options加载完，因为后面的getDetails初始化数据里要基于这个数据匹配；
			await this.initOptionsData() // 户主姓名选项， 土地编号选项			const eventChannel = this.getOpenerEventChannel();			// 监听acceptDataFromOpenerPage事件，获取上一页面通过acceptDataFromOpenerPage传送到当前页面的数据			eventChannel.on('acceptDataFromOpenerPage', (item) => {				console.log('item from farm work details', item);				this.param = item				this.$nextTick(() => {					this.getDetails()				})				// 调用上一页的事件				eventChannel.emit('someEvent', {					data: 'eventChannel'				})			})
			this.$nextTick(() => {
				// this.$refs.fileUploadRef.show();
				
			})		},		methods: {
			...mapActions({
				getPaddyData: 'waterFertilizer/getPaddyData',
				getHouseholdHeadNameData: 'waterFertilizer/getHouseholdHeadNameData'
			}),			fileChange(file) {				this.form.model.fileList = file.fileList				// this.$refs.uForm.validateField('fileList')			},			// 视频播放出错时触发			videoErrorCallback: function(e) {				uni.showModal({			        content: e.target.errMsg,			        showCancel: false			    })			},			// 预览图片			previewImg(index) {				uni.previewImage({					urls: this.detailsData.images.map(item => item.url),					current: index, // 当前预览图片的索引，不传则为0，从第一张开始					longPressActions: {						itemList: ['保存图片', '收藏'],						fail: function(err) {							console.log(err.errMsg);						}					}				});			},			// 选择处理时间日期确认事件			calendarConfirm(e) {				this.form.showCalendar = false				this.form.model[this.activeHandleTimeIndex].handleTime = `${e[0]}`				// console.log('', this.form.model.handleTime);				// this.$refs.uForm.validateField('handleTime')			},			// 默认让日期选择框的当日标记红点			formatter(day) {				const d = new Date()				let month = d.getMonth() + 1				const date = d.getDate()				if (day.month == month && day.day == date) {					// day.bottomInfo = '有优惠'					day.dot = true				}				return day			},			// 隐藏已经显示的软键盘，如果软键盘没有显示则不做任何操作。			hideKeyboard() {				uni.hideKeyboard()			},			// 确认提交修改			async confirm() {
				const prorepair_yh_afterList = this.form.model.map((item, index) => {
					return {
						content: item.description,
						curingtime: new Date(item.handleTime).getTime(),
						profileid: JSON.stringify(item.profileid)
					}
				})
				const data = {
					content: this.detailsData.content, // 内容
					creationtime: whichDate({ date: 0, format: 'yyyy-MM-dd hh:mm:ss' }),
					creatoruserid: this.userInfo.id, // 如果不是用id就用roleId
					handlestatus: this.detailsData.handleState === '处理中' ? '1' : '2',
					id: this.param.id,
					projectguids: "[]",
					prorepair_yh_afterList: prorepair_yh_afterList, // 更新内容
					...this.detailsData.commitEventInfo,
				}
				console.log('confirmData', data);
				try{
					const res = await getProRepair_YH_UPDATE(data, true)
					this.$refs.uToast.show({
						type: 'success',
						message: res.msg || '更新成功',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						complete: () => {
							uni.navigateTo({
								url: '/pages/farm-work/components/farm-work-details',
								events: {
									// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
									someEvent: (res) => {
										console.log(res.data)
									}
								},
								success: (res) => {
									res.eventChannel.emit('acceptDataFromOpenerPage', this.param)
								}
							})				
						}
					})
				}catch(e){
					//TODO handle the exception
				}
							},			// 获取详情数据			async getDetails() {				const { data } = await getProRepair_YHDetails(this.param.id, true)				console.log('dataqqq', data);				const { theme, startdate, enddate, operatorids, content, profileid, prorepair_yh_afterList, handlestatus, projectguids } = data				const imgFileFormat = ["jpg", 'jpeg', 'png', 'bmp', 'tiff', 'ai', 'cdr', 'eps'] // 图片文件格式				const videoFileFormat = ['avi', 'mpeg', 'mp4', 'mov', 'wmv', 'flv'] // 视频文件格式				const audioFileFormat = ['aiff', 'wav', 'mp3'] // 音频文件格式				const newFileForFileid = JSON.parse(profileid)				// console.log(newFileForFileid)
				this.navbarTitle = projectguids + ' 更新详情'				const media = imgFileFormat.concat(videoFileFormat)				this.detailsData = {					eventInfo: [						{ label: '事件信息', value: theme },						{ label: '处理开始时间：', value: toDateString(startdate, 'yyyy-MM-dd HH:mm:ss') },						{ label: '处理结束时间：', value: toDateString(enddate, 'yyyy-MM-dd HH:mm:ss') },						{ label: '处理人员：', value: operatorids },					],
					commitEventInfo: {
						startdate,
						enddate,
						theme,
						operatorids: this.handleOperatorids(operatorids, this.processingPersonnelOptions),
						profileid: profileid,
						projectguids: this.handleOperatorids(projectguids, this.paddyNumberOptions)
					},					content, // 事件内容					handleState: handlestatus === '1' ? '处理中' : '已完结', // 处理状态					// images: this.handleFileType(newFileForFileid, imgFileFormat), // 图片					// videos: this.handleFileType(newFileForFileid, videoFileFormat), // 视频
					medias: this.handMedia(newFileForFileid, media),					audios: this.handleFileType(newFileForFileid, audioFileFormat), // 音频				}					const fileFormat = imgFileFormat.concat(videoFileFormat) // 图片和视频的常用格式				this.form.model = prorepair_yh_afterList.map(item => {					return {						description: item.content, // 处理内容						handleTime: toDateString(item.curingtime, 'yyyy-MM-dd'), // 处理时间						fileList: JSON.parse(item.profileid).map(item => configService.fileUrl + item.url),
						profileid: JSON.parse(item.profileid)					}				})				this.skeletonLoading = false // 骨架状态false,显示插槽内容				console.log('detailsData', this.detailsData)			},			handleFileType(source = [], type = []) {				const newArray = source.filter(item => {					return type.indexOf(item.fileId.split('.')[1]) !== -1				})				return newArray.map(item => {					return {						...item,						url: configService.fileUrl + item.url					}				})			},
			handMedia(source = [], type = []) {
				const newArray = source.filter(item => {
					return type.indexOf(item.fileId.split('.')[1]) !== -1
				})
				return newArray.map(item => configService.fileUrl + item.url)
			},			// 删除图片或者视频			ceshiImgDelete(e, item) {				console.log('ceshiImgDelete', e, item)			},			//上传失败			ceshiUploadFail(err) { 				console.log('err', err)			},
			deleteFile(e, item) {
				// console.log('删除文件', e);
				// this.form.model.fileList.splice(e.index, 1)
				item.profileid.splice(e.index, 1)
			},
			// 文件选择回调
			onChange(files) {
				this.progress = 0
				console.log('当前选择的文件列表：', JSON.stringify([...files.values()]));
				const fileList = JSON.stringify([...files.values()])
				if(!JSON.parse(fileList).length) {
					return false 
				}
				this.showLoading = plus.nativeUI.showWaiting(`上传中, \n 进度：${this.progress}`);
			},
			// 上传进度回调
			onprogress(item) {
				console.log('onprogressCB', item);
				const { totalChunks, chunkNumber } = item
				this.progress = (chunkNumber / totalChunks * 100 / 3).toFixed(2) + '%'
				
				this.showLoading.setTitle(`上传中, \n 进度：${this.progress}`)
				
				// 不知道为啥每个切片会请求三回， 所以这里处理了下
				if(chunkNumber === totalChunks * 3) {
					this.showLoading.setTitle(`上传完成`)
					setTimeout(() => {
						this.showLoading.close()
					}, 500)
				}
			},
			// 某文件(切片)上传结束回调(成功失败都回调)
			onuploadEnd(item) {
				console.log(`${item.name}已上传结束，上传状态=${item.type}`);
				
			},
			// 切片组装回调
			callMerged(res, item){
				// console.log('callMerged----------', res);
				const { data } = JSON.parse(res)
				console.log('callMerged----------', data);
				const index = data.url.lastIndexOf('\/') // 开始截取的索引
				item.fileList.push(configService.fileUrl + data.url) // 用于预览， 这里的视频无法预览，是因为接口返回 的 地址有问题
				item.profileid.push({
					...data,
					curingtime: new Date(data.curingtime).getTime(),
					fileId: data.url.substring((index+1), data.url.length),
				}) // 用于保存
				
			},
			async initOptionsData() {
				// 获取户主姓名集合
				const p1 = this.getHouseholdHeadNameData({keyword: ''})
				const p2 = this.getPaddyData()
				const res = await Promise.all([p1, p2])
				const personData = res[0]
				const paddyData = res[1]
				this.processingPersonnelOptions  = personData.map(item => {
					return {
						name: item.fullName,
						value: item.id,
					}
				}) // picker的数据是二维数组
				this.paddyNumberOptions = paddyData.map(item => {
					return {
						name: item.ProName,
						value: item.Id,
					}
				})
				
			},
			// 处理value数据, operatorids处理人员和projectguids田地数据
			handleOperatorids(value, source) {
				
				// 没有值 || 源数组长度 = 0
				if(!value || !source.length) {
					return ''
				}
				// 多
				if(value.indexOf(';') !== -1 || value.indexOf(',') !== -1) {
					const personArr = value.split(';')
					const fullList = source.filter(item => {
						return personArr.indexOf(item.name) !== -1
					})
					return JSON.stringify(fullList.map(item => item.value))
				} else { // 单
					console.log('11111', value);
					console.log('22222', source);
					const fullList = source.find(item => {
						return item.name === value
					})
					return JSON.stringify(new Array(fullList.value))
				}
			}		},	}</script><style lang="scss" scoped>
	.htz-image-upload-Item {
		width: 160rpx;
		height: 160rpx;
		margin: 13rpx;
		border-radius: 10rpx;
		position: relative;
	}
	.htz-image-upload-Item-add {
		font-size: 105rpx;
		text-align: center;
		border: 1px dashed #d9d9d9;
		color: #d9d9d9;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>