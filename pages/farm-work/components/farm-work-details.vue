<template>
	<view class="seck-flex-y height_full">
		<sk-navbar :title="navbarTitle"/>
		<!-- seck-flex-fill seck-flex-y 自动沾满剩余高度 -->
		<view class="seck-flex-fill seck-flex-y height_0 padding-top-sm">
			<scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y @scrolltolower="() => {}">
				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->
				<view class="padding-tb-sm padding-lr-lg">
					<view class="box-shadow round">
						<view class="padding-tb-sm padding-lr-lg box-shadow-bottom seck-flex-y-center gap-sm">
							<u--text text="事件信息" lines="1" size="16" blod color="#222"></u--text>
						</view>
						<!--多套一层，给padding-->
						<view class="padding-lg seck-flex-y gap-sm">
							<view class="seck-flex-y-center seck-flex-between" v-for="(item, index) in detailsData.eventInfo" :key="index">
								<view>
									<u--text :text="item.label" lines="1" size="13"  color="#666"></u--text>
								</view>
								<view class="">
									<u--text :text="item.value" lines="1" size="13" blod color="#222"></u--text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->
				<view class="padding-tb-sm padding-lr-lg">
					<view class="box-shadow round">
						<view class="padding-tb-sm padding-lr-lg box-shadow-bottom seck-flex-y-center gap-sm">
							<u--text text="事件内容" lines="1" size="16" blod color="#222"></u--text>
						</view>

						<view v-if="detailsData.content" class="padding-lr-lg padding-tb-lg">
							<u-skeleton
								rows="1"
								:title="false"
								:rowsWidth="['100%', '100%', '100%']"
								:rowsHeight="['15px', '15px', '15px']"
								:loading="skeletonLoading"
							>
								<view>
									<u--text :text="detailsData.content" lines="10" size="13"  color="#666"></u--text>
								</view>
							</u-skeleton>
							
						</view>
						<view v-if="!detailsData.content" class="padding-lr-lg padding-tb-lg">
							<u-empty mode="data"/>
						</view>

					</view>
				</view>
				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->
				<view class="padding-tb-sm padding-lr-lg">
					<view class="box-shadow round">
						<view class="padding-tb-sm padding-lr-lg box-shadow-bottom seck-flex-y-center gap-sm">
							<u--text text="相关附件" lines="1" size="16" blod color="#222"></u--text>
						</view>

						<view v-if="detailsData.medias.length || detailsData.audios.length" class="seck-flex-y gap-lg  padding-lr-lg padding-tb-lg">
							 <view class="">
								<file-upload v-model="detailsData.medias" :max="9" :remove="false" :add="false"/>
							 </view>
							<custom-audio v-for="(item, index) in detailsData.audios" :key="index" :title="item.name" :audio="item.url"></custom-audio>
						</view>
						<view v-else class="seck-flex-y gap-lg  padding-lr-lg padding-tb-lg">
							<u-empty mode="data"/>
						</view>
						<u-gap height="30rpx"></u-gap>
					</view>
				</view>
				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->
				<view v-if="detailsData.prorepair_yh_afterList" class="padding-tb-sm padding-lr-lg" v-for="(item, index) in detailsData.prorepair_yh_afterList" :key="index">
					<view class="box-shadow round">
						<view class="padding-tb-sm padding-lr-lg box-shadow-bottom seck-flex-y-center gap-sm">
							<u--text :text="'处理情况' + (index + 1)" lines="1" size="16" blod color="#222"></u--text>
						</view>
						<view class="seck-flex-y gap-lg padding-lr-lg padding-tb-lg">
							<!-- <seck-upload :file-list.sync="fileList" @on-success="fileChange" @on-delete="fileChange"></seck-upload> -->
							<u--text :text="item.content" lines="10" size="13"  color="#666"></u--text>
							<!-- <u-scroll-list indicatorWidth="20" :indicator="false">
							    <view v-for="(item, index) in item.profileid" :key="index" style="max-height: 180rpx; width: 120rpx;margin-right: 30rpx;">
							        <image :src="item.url"  style="height: 160rpx;max-height: 160rpx; width: 120rpx;margin-right: 10px;border-radius: 4px;" mode="widthFix" @click="previewImg(index)"></image>
							    </view>
							</u-scroll-list> -->
							<file-upload v-model="item.profileid" :max="9" :remove="false" :add="false"/>
							<u--text :text="item.curingtime" lines="10" size="13"  color="#666"></u--text>
						</view>
					</view>
				</view>
				<u-gap height="20rpx"></u-gap>
			</scroll-view>
		</view>
		<uni-fab ref="fab" :pattern="fabConfig.pattern" :horizontal="fabConfig.horizontal" :vertical="fabConfig.vertical" @fabClick="fabClick" :popMenu="fabConfig.popMenu" />
	</view>
</template>

<script>
	import SeckUpload from '@/pages/components/sk-upload/index.vue'
	import CustomAudio from '@/pages/components/custom-audio/index.vue'
	import { getProRepair_YHDetails } from '@/api/farm-work.js'
	import { toDateString } from 'xe-utils'
	import configService from '@/common/service/config.service.js';
	import FileUpload from '@/pages/components/sk-file-upload/index.vue'
	
	export default {
		data() {
			return {
				fileList: [
					{url: 'https://cdn.uviewui.com/uview/swiper/1.jpg'},
				],
				fabConfig: {
					pattern: {
						color: '#7A7E83', // 文字默认颜色
						backgroundColor: '#fff', // 背景色
						selectedColor: '#007AFF', // 文字选中时的颜色
						buttonColor: '#007AFF', // 按钮背景色
						iconColor: '#fff',
						// icon: '', // 自定义图标，图标来自 uni-icons
					},
					horizontal: 'right', // 水平对齐方式。left:左对齐，right：右对齐
					vertical: 'bottom', // 垂直对齐方式。bottom:下对齐，top：上对齐
					popMenu: false, // 是否使用弹出菜单
					content: [] // 展开菜单内容配置项
				},
				imglist: [
					{ url: 'https://cdn.uviewui.com/uview/goods/1.jpg' },
					{ url: 'https://cdn.uviewui.com/uview/goods/2.jpg' },
					{ url: 'https://cdn.uviewui.com/uview/goods/3.jpg' },
					{ url: 'https://cdn.uviewui.com/uview/goods/4.jpg' },
					{ url: 'https://cdn.uviewui.com/uview/goods/5.jpg' },
					{ url: 'https://cdn.uviewui.com/uview/goods/1.jpg' },
				], // 图片列表
				param: {}, // 农事管理携带进来的参数
				detailsData: {
					eventInfo: [
						{ label: '事件信息', value: '' },
						{ label: '处理开始时间：', value: '' },
						{ label: '处理结束时间：', value: '' },
						{ label: '处理人员：', value: '' },
					],
					medias: [],
					audios: [],
					
				}, // 详情事件信息数据
				skeletonLoading: true, // 骨架状态
				navbarTitle: '' ,// 导航栏标题
			}
		},
		components: { SeckUpload, CustomAudio, FileUpload },
		onLoad() {
			const eventChannel = this.getOpenerEventChannel();
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过acceptDataFromOpenerPage传送到当前页面的数据
			eventChannel.on('acceptDataFromOpenerPage', (item) => {
				console.log('res', item)
				this.param = item
				this.$nextTick(() => {
					this.getDetails()
				})
				// 调用上一页的事件
				eventChannel.emit('someEvent', {
					data: 'eventChannel from farm details'
				})
			})
		},
		methods: {
			fileChange({ fileList }) {
				// console.log('111', this.fileList);
				// this.uploadFiles = uploadFileUrl
			},
			// 视频播放出错时触发
			videoErrorCallback: function(e) {
				uni.showModal({
			        content: e.target.errMsg,
			        showCancel: false
			    })
			},
			// 悬浮按钮点击事件
			fabClick(){
				uni.navigateTo({
					url: '/pages/farm-work/components/farm-work-update',
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
			},
			// 预览图片
			previewImg(index) {
				uni.previewImage({
					urls: this.detailsData.images.map(item => item.url),
					current: index, // 当前预览图片的索引，不传则为0，从第一张开始
					longPressActions: {
						itemList: ['保存图片', '收藏'],
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			// 获取详情数据
			async getDetails() {
				const { data } = await getProRepair_YHDetails(this.param.id, true)
				console.log('data', data);
				const { theme, startdate, enddate, operatorids, content, profileid, prorepair_yh_afterList, projectguids } = data
				const imgFileFormat = ["jpg", 'jpeg', 'png', 'bmp', 'tiff', 'ai', 'cdr', 'eps'] // 图片文件格式
				const videoFileFormat = ['avi', 'mpeg', 'mp4', 'mov', 'wmv', 'flv'] // 视频文件格式
				const audioFileFormat = ['aiff', 'wav', 'mp3'] // 音频文件格式
				const newFileForFileid = JSON.parse(profileid)
				const media = imgFileFormat.concat(videoFileFormat)
				// console.log(newFileForFileid)
				this.navbarTitle = projectguids + ' 农事详情'
				this.detailsData = {
					eventInfo: [
						{ label: '事件信息', value: theme },
						{ label: '处理开始时间：', value: toDateString(startdate, 'yyyy-MM-dd HH:mm:ss') },
						{ label: '处理结束时间：', value: toDateString(enddate, 'yyyy-MM-dd HH:mm:ss') },
						{ label: '处理人员：', value: operatorids },
					],
					content, // 事件内容
					// images: this.handleFileType(newFileForFileid, imgFileFormat), // 图片
					// videos: this.handleFileType(newFileForFileid, videoFileFormat), // 视频
					medias: this.handMedia(newFileForFileid, media),
					audios: this.handleFileType(newFileForFileid, audioFileFormat), // 音频
					prorepair_yh_afterList: prorepair_yh_afterList.map(item => {
						return {
							...item,
							curingtime: toDateString(item.curingtime, 'yyyy-MM-dd') ,
							profileid: JSON.parse(item.profileid).map(item => (configService.fileUrl + item.url))
						}
					})
				},
				this.skeletonLoading = false // 骨架状态false,显示插槽内容
				console.log('detailsData', this.detailsData)
			},
			handleFileType(source = [], type = []) {
				const newArray = source.filter(item => {
					return type.indexOf(item.fileId.split('.')[1]) !== -1
				})
				return newArray.map(item => {
					return {
						...item,
						url: configService.fileUrl + item.url
					}
				})
			},
			handMedia(source = [], type = []) {
				const newArray = source.filter(item => {
					return type.indexOf(item.fileId.split('.')[1]) !== -1
				})
				return newArray.map(item => configService.fileUrl + item.url)
			},
		},
	}
</script>

<style>
</style>
