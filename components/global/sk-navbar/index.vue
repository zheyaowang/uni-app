<!-- 导航条模板 -->
<template>
	<view class="sk-navbar c-container">
		<u-navbar
			class="nav-bar"
			:placeholder="placeholder"
			:height="height"
			:fixed="fixed"
			:title="title || routerTitle"
			:title-width="titleWidth"
			:title-style="titleStyle"
			:left-text="leftText"
			:left-icon="leftIcon"
			:left-icon-size="leftIconSize"
			:left-icon-color="leftIconColor"
			:right-text="rightText"
			:right-icon="rightIcon"
			:right-icon-color="rightIconColor"
			:bg-color="bgColor"
			:auto-back="autoBack"
			:safe-area-inset-top="safeAreaInsetTop"
			@leftClick="leftClick"
			@rightClick="$emit('rightClick')"
		>
			<view class="navbar-left" slot="left" v-if="$slots.left"><slot name="left"></slot></view>
			<view class="navbar-center" slot="center" v-if="$slots.center">
				<slot name="center">
					<view :style="[{ width: $u.addUnit(titleWidth) }, $u.addStyle(titleStyle)]">{{ title || routerTitle }}</view>
				</slot>
			</view>
			<view class="navbar-right" slot="right" v-if="$slots.right"><slot name="right"></slot></view>
		</u-navbar>
	</view>
</template>

<script>
import props from './props.js';

export default {
	name: 'sk-navbar',
	mixins: [uni.$u.mpMixin, uni.$u.mixin, props],
	data() {
		return {
			routerTitle: ''
		};
	},
	created() {
		// #ifndef APP-NVUE
		if (!this.title && this.title !== null) {
			this.routerTitle = this.$Route.meta?.title || this.$Route.name;
		}
		// #endif
	},
	methods: {
		leftClick() {
			this.$emit('leftClick');
			// h5返回到原生安卓页面
			if (this.autoBack && this.backNative && window.android.js_call_java_goBackFun) {
				window.android.js_call_java_goBackFun('back');
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.sk-navbar {
}
</style>
