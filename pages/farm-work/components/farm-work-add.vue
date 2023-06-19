<template>
	<view class="seck-flex-y height_full bg-white">
		<sk-navbar/>
		<!-- seck-flex-fill seck-flex-y 自动沾满剩余高度 -->
		<view class="seck-flex-fill seck-flex-y padding-lr height_0 padding-tb-sm">
			<!-- <scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y @scrolltolower="() => {}"> -->
				<u--form labelPosition="top" :model="form.model" :rules="form.rules" ref="uForm" errorType="message" class="padding-lr-lg padding-bottom-lg">
					<u-form-item label="事件主题" prop="eventTopic" labelWidth="80" borderBottom>
						<!--disabledColor="#ffffff" 暂时不要背景色-->
						<u--input v-model="form.model.eventTopic" placeholder="请输入事件主题" border="none" ></u--input>
					</u-form-item>
					<u-form-item label="稻田编号" prop="paddyNumber" labelWidth="80" borderBottom ref="paddyNumber" @click="form.showPaddyNumberPopup = true; hideKeyboard()">
						<u--input v-model="form.model.paddyNumber" disabled placeholder="请选择稻田编号" border="none" :customStyle="{ background: '#fff' }"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="处理人员" prop="processingPersonnel" labelWidth="80" borderBottom ref="processingPersonnel" @click="form.showProcessingPersonnelPopup = true; hideKeyboard()">
						<u--input v-model="form.model.processingPersonnel" disabled placeholder="请选择处理人员" border="none" :customStyle="{ background: '#fff' }"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="处理开始时间" prop="processingStartTime" labelWidth="180" borderBottom ref="processingStartTime" @click="form.showProcessingStartTimePopup = true; hideKeyboard()">
						<u--input v-model="form.model.processingStartTime" disabled placeholder="请选择处理开始时间" border="none" :customStyle="{ background: '#fff' }"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="处理结束时间" prop="processingEndTime" labelWidth="180" borderBottom ref="processingEndTime" @click="form.showProcessingEndTimePopup = true; hideKeyboard()">
						<u--input v-model="form.model.processingEndTime" disabled placeholder="请选择处理结束时间" border="none" :customStyle="{ background: '#fff' }"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="处理状态" prop="handleState" labelWidth="180" borderBottom ref="handleState" @click="form.showHandleStatePopup = true; hideKeyboard()">
						<u--input v-model="form.model.handleState" disabled placeholder="请选择处理状态" border="none" :customStyle="{ background: '#fff' }"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="事件内容" prop="eventContent" labelWidth="80" borderBottom>
						<!--disabledColor="#ffffff" 暂时不要背景色-->
						<u--input v-model="form.model.eventContent" placeholder="请输入事件内容" border="none" ></u--input>
					</u-form-item>
					<!-- prop="fileList" -->
					<u-form-item label="相关照片" labelWidth="80" borderBottom style="position: relative;">
						<!-- <seck-upload :file-list.sync="form.model.fileList" @on-success="fileChange" @on-delete="fileChange" desc="最多可上传6张照片" class="margin-top-lg"></seck-upload> -->
						<view style="display: flex;width: 100%;align-items: center;flex-direction: row;flex-wrap: wrap;">
						
							<file-upload v-model="profileid" :max="9" :remove="true" :add="false"  @imgDelete="deleteFile"/>
							<!-- 组件是窗口级滚动，不要在scroll-view内使用 -->
							<lsj-upload ref="fileUploadRef" childId="upload2"
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
								@merged="callMerged"
								>
								<view class="htz-image-upload-Item htz-image-upload-Item-add">
									+
								</view>
							</lsj-upload>
						</view>
					</u-form-item>
				</u--form>
				<u-gap height="30"></u-gap>
				<u-action-sheet :show="form.showPaddyNumberPopup" :actions="form.paddyNumberOptions" title="选择编号" description="请选择稻田编号" @close="form.showPaddyNumberPopup = false" @select="paddyNumberSelect"/>
				<!-- <u-action-sheet :show="form.showProcessingPersonnelPopup" :actions="form.processingPersonnelOptions" title="选择人员" description="请选择处理人员" @close="form.showProcessingPersonnelPopup = false" @select="processingPersonnelSelect"/> -->
				<u-picker 
					:show="form.showProcessingPersonnelPopup" 
					:columns="form.processingPersonnelOptions" 
					title="请选择处理人员" 
					keyName="name" 
					visibleItemCount="6"
					@close="() => {}"
					@cancel="form.showProcessingPersonnelPopup = false"
					@confirm="processingPersonnelSelect"
				/>
				<u-datetime-picker :show="form.showProcessingStartTimePopup" v-model="nowDate" mode="datetime" closeOnClickOverlay @confirm="processingStartTimeConfirm" @cancel="form.showProcessingStartTimePopup = false" @close="form.showProcessingStartTimePopup = false"/>
				<u-datetime-picker :show="form.showProcessingEndTimePopup" v-model="nowDate" mode="datetime" closeOnClickOverlay @confirm="processingEndTimeConfirm" @cancel="form.showProcessingEndTimePopup = false" @close="form.showProcessingEndTimePopup = false"/>
				<!-- 这个组件以后有时间需要单独处理下事件穿透的问题 -->
				<u-action-sheet :show="form.showHandleStatePopup" :actions="form.handleStateOptions" title="选择状态" description="请选择处理状态" @close="form.showHandleStatePopup = false" @select="handleStateSelect" :closeOnClickOverlay="false"/>
			<!-- </scroll-view> -->
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-button type="primary" text="确定" @click="showModal = true" style="position: fixed; bottom: 0;z-index: 1024;"></u-button>
		
		<!-- 模态框 -->
		<sk-modal :show.sync="showModal" title="温馨提示" content="确定要提交信息吗？" @confirm="confirm"></sk-modal>
	</view>
</template>

<script>
	import SeckUpload from '@/pages/components/sk-upload/index.vue'
	import FileUpload from '@/pages/components/sk-file-upload/index.vue'
	import LsjUpload from '@/uni_modules/lsj-upload/components/lsj-upload/lsj-upload.vue'
	import { mapActions, mapGetters } from 'vuex'
	import { getProRepair_YH_add } from '@/api/farm-work.js'
	
	import configService from '@/common/service/config.service.js';
	import { TOKEN_NAME } from '@/common/util/constants';
	import { chunk, merger } from '@/api/farm-work.js'
	import { whichDate } from "@/common/util/tools.js"
	import { toDateString } from 'xe-utils'
	
	export default {
		components: { SeckUpload, LsjUpload, FileUpload },
		data() {
			return {
				profileid: [
					// { url: 'https://cdn.uviewui.com/uview/goods/1.jpg' },
					// 'http://39.174.79.186:30002/api/file/Image/annex/20230524_431102204040972997.jpeg'
				],
				form: {
					model: {
						eventTopic: '', // 事件主题
						paddyNumber: '', // 稻田编号
						paddyNumberValue: void 0, 
						processingPersonnel: '', // 处理人员
						processingPersonnelValue: void 0, // 处理人员对应的value
						processingStartTime: '', // 处理开始时间
						processingEndTime: '', // 处理结束时间
						handleState: '', // 处理状态
						handleStateValue: void 0,
						eventContent: '', // 事件内容
						fileList: [], // 相关附件
					},
					rules: {
						eventTopic: {
							type: 'string',
							min: 1,
							required: true,
							message: '请输入事件主题',
							trigger: ['change']
						},
						paddyNumber: {
							type: 'string',
							required: true,
							message: '请选择稻田编号',
							trigger: ['change','blur']
						},
						processingPersonnel: {
							type: 'string',
							required: true,
							message: '请选择处理人员',
							trigger: ['change','blur']
						},
						processingStartTime: {
							type: 'string',
							required: true,
							message: '请选择开始时间',
							trigger: ['change','blur']
						},
						processingEndTime: {
							type: 'string',
							required: true,
							message: '请选择结束时间',
							trigger: ['change','blur']
						},
						handleState: {
							type: 'string',
							required: true,
							message: '请选择处理状态',
							trigger: ['change','blur']
						},
						eventContent: {
							type: 'string',
							min: 1,
							required: true,
							message: '请输入事件内容',
							trigger: ['change', 'blur']
						},
						fileList: {
							type: 'array',
							min: 1,
							required: true,
							message: '请上传相关附件',
							trigger: ['change','blur']
						}
					},
					showCalendar: false, // 日期弹框显隐
					showPaddyNumberPopup: false, // 选择稻田编号popup的显隐
					showProcessingPersonnelPopup: false, // 处理人员popup显隐
					showProcessingStartTimePopup: false, // 处理开始时间popup显隐
					showProcessingEndTimePopup: false, // 处理结束时间popup显隐
					showHandleStatePopup: false, // 处理状态popup显隐
					paddyNumberOptions: [
						// { name: 'testNo1', disabled: false, value: 1 },
						// { name: 'testNo2', disabled: false, value: 0 }
					], // 稻田编号options
					processingPersonnelOptions: [], // 处理人员options
					handleStateOptions: [
						{ name: '已完结', disabled: false, value: "2" },
						{ name: '处理中', disabled: false, value: "1" }
					], // 处理状态options
					
				},
				nowDate: new Date().getTime(),
				// 上传接口参数
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
				showModal: false, // 模态框
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'login/userInfo'
			}),
		},
		onLoad() {
			this.$nextTick(() => {
				this.initOptionsData() // 户主姓名选项， 土地编号选项
				// 重新定位上传组件
				this.$refs.fileUploadRef.show();
			})
		},
		methods: {
			...mapActions({
				getPaddyData: 'waterFertilizer/getPaddyData',
				getHouseholdHeadNameData: 'waterFertilizer/getHouseholdHeadNameData'
			}),
			// 隐藏已经显示的软键盘，如果软键盘没有显示则不做任何操作。
			hideKeyboard() {
				uni.hideKeyboard()
			},
			// 选择稻田编号事件
			paddyNumberSelect(e) {
				this.form.model.paddyNumber = e.name
				this.form.model.paddyNumberValue = e.value
				this.$refs.uForm.validateField('paddyNumber')
			},
			// 选择处理人员事件
			processingPersonnelSelect({ value }) {
				this.form.model.processingPersonnel = value[0].name // value[0].value对应的值
				this.form.model.processingPersonnelValue = value[0].value
				this.form.showProcessingPersonnelPopup = false
				this.$refs.uForm.validateField('processingPersonnel')
			},
			// 处理开始时间确认事件
			processingStartTimeConfirm(e) {
				const start = e.value
				const end = new Date(this.form.model.processingEndTime).getTime()
				if(start >= end) return uni.$u.toast('处理开始时间不能大于处理结束时间')
				this.form.showProcessingStartTimePopup = false // close popup
				this.form.model.processingStartTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss') // e.value是时间戳，需要转成需要的日期格式
				this.$refs.uForm.validateField('processingStartTime')
			},
			// 处理结束时间确认事件
			processingEndTimeConfirm(e) {
				const start = new Date(this.form.model.processingStartTime).getTime()
				const end = e.value
				if(start >= end) return uni.$u.toast('处理开始时间不能大于处理结束时间')
				this.form.showProcessingEndTimePopup = false // close popup
				this.form.model.processingEndTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss') // e.value是时间戳，需要转成需要的日期格式
				this.$refs.uForm.validateField('processingEndTime')
			},
			// 处理状态确认事件
			handleStateSelect(e) {
				console.log('e', e);	
				this.form.model.handleState = e.name
				this.form.model.handleStateValue = e.value
				this.$refs.uForm.validateField('handleState')
			},
			// 相关附件处理事件
			fileChange(file) {
				console.log('file', file);
				this.form.model.fileList = file.fileList
				this.$refs.uForm.validateField('fileList')
			},
			// 确认提交新增
			async confirm() {
				// 单独校验某一字段
				// this.$refs.uForm.validateField('handleTime')
				// this.$refs.uForm.validateField('handleState')
				this.$refs.uForm.validate().then(async (res) => {
					
					uni.$u.toast('校验通过') // toast只有msg参数，不支持定义图标之类的
					console.log('form.model', this.form.model);
					const model = this.form.model
					const data = {
						content: model.eventContent,
						creationtime: whichDate({ date: 0, format: 'yyyy-MM-dd hh:mm:ss' }),
						creatoruserid: this.userInfo.id,
						enddate: new Date(model.processingEndTime).getTime(),
						handlestatus: model.handleStateValue,
						id: '',
						operatorids: JSON.stringify([model.processingPersonnelValue]),
						profileid: JSON.stringify(model.fileList),
						projectguids: JSON.stringify([model.paddyNumberValue]),
						prorepair_yh_afterList: [],
						startdate: new Date(model.processingStartTime).getTime(),
						theme: model.eventTopic,
					}
					console.log('data.data', data);
					const result = await getProRepair_YH_add(data)
					this.$refs.uToast.show({
						type: 'success',
						message: result.msg || '创建成功',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'				
					})
					uni.navigateTo({
						url: '/pages/farm-work/components/farm-work-manage',
						events: {
							// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
							someEvent: (res) => {
								console.log(res.data)
							}
						},
						success(res) {
							res.eventChannel.emit('acceptDataFromOpenerPage', {
								// id: item.id
								id: 'xuzuhuan form add'
							})
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			async initOptionsData() {
				// 获取户主姓名集合
				this.getHouseholdHeadNameData({keyword: ''}).then(res => {
					this.form.processingPersonnelOptions  = new Array(res.map(item => {
						return {
							name: item.fullName,
							value: item.id,
						}
					})) // picker的数据是二维数组
				})
				
				const paddyData = await this.getPaddyData() // 获取田地编号
				this.form.paddyNumberOptions = paddyData.map(item => {
					return {
						name: item.ProName,
						value: item.Id,
					}
				})
			},
			
			
			// 文件选择回调
			onChange(files) {
				this.progress = 0
				console.log('当前选择的文件列表：', JSON.stringify([...files.values()]));
				const fileList = JSON.stringify([...files.values()])
				if(!JSON.parse(fileList).length) {
					return false 
				}
				// #ifdef APP-PLUS
				this.showLoading = plus.nativeUI.showWaiting(`上传中, \n 进度：${this.progress}`);
				// #endif
			},
			// 上传进度回调
			onprogress(item) {
				console.log('onprogressCB', item);
				const { totalChunks, chunkNumber } = item
				this.progress = (chunkNumber / totalChunks * 100 / 3).toFixed(2) + '%'
				
				// #ifdef APP-PLUS
				this.showLoading.setTitle(`上传中, \n 进度：${this.progress}`)
				
				// 不知道为啥每个切片会请求三回， 所以这里处理了下
				if(chunkNumber === totalChunks * 3) {
					this.showLoading.setTitle(`上传完成`)
					setTimeout(() => {
						this.showLoading.close()
					}, 500)
				}
				// #endif
			},
			// 某文件(切片)上传结束回调(成功失败都回调)
			onuploadEnd(item) {
				console.log(`${item.name}已上传结束，上传状态=${item.type}`);
				
			},
			// 切片组装回调
			callMerged(res){
				// console.log('callMerged----------', res);
				const { data } = JSON.parse(res)
				console.log('callMerged----------', data);
				const index = data.url.lastIndexOf('\/') // 开始截取的索引
				this.profileid.push(configService.fileUrl + data.url) // 这里的视频无法预览，是因为接口返回 的 地址有问题
				this.form.model.fileList.push({
					...data,
					fileId: data.url.substring((index+1), data.url.length),
				})
			},
			deleteFile(e) {
				// console.log('删除文件', e);
				this.form.model.fileList.splice(e.index, 1)
			}
		}
	}
</script>

<style lang="scss" scoped>
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
