<template>
	<view class="my-school height_full">
		<sk-navbar back-native></sk-navbar>
		<view class="my-school__content">
				<view class="user-info bg-white">
					<u-picker :show="show" :columns="columns" @confirm="select" @cancel="show=false"></u-picker>
					<u-cell-group :border="false" class="part">
						<u-cell class="no-line" isLink @click="show=true">
							<view slot="title" class="title">学校</view>
							<view slot="value">学校111</view>
						</u-cell>
						<u-cell class="no-line" isLink>
							<view slot="title" class="title">组织</view>
							<view slot="value">学校111</view>
						</u-cell>
						<u-cell class="no-line" isLink>
							<view slot="title" class="title">部门</view>
							<view slot="value">学校111</view>
						</u-cell>
					</u-cell-group>
				</view>
			<view class="my-school__foot"><u-button type="primary" shape="circle" color="#0365EE" text="确定" @click="handleSubmit"></u-button></view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				columns: [
					['中国', '美国', '日本']
				],
			}
		},
		methods: {
			select(e) {
				const { value = [] } = e;
				this.show = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
.my-school {
	padding: 30rpx 0;
	background-color: #f5f5f5;
	.u-cell {
		padding: 5px 0;
	}
	&__foot {
		padding: 100rpx 30rpx 0;
	}
}
</style>
