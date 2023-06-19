<template>
	<u-picker
		class="sk-picker"
		:show="visible"
		:title="title"
		:key-name="keyName"
		:closeOnClickOverlay="closeOnClickOverlay"
		:visibleItemCount="8"
		:columns="columns"
		:loading="loading"
		@close="close"
		@cancel="cancel"
		@confirm="confirm"
	></u-picker>
</template>

<script>
export default {
	props: {
		// 显示隐藏
		show: {
			type: Boolean,
			default: false
		},
		// 标题
		title: {
			type: String,
			default: ''
		},
		// 选择项集合
		columns: {
			type: Array,
			default: () => []
		},
		// 自定义需要展示的label属性键名
		keyName: {
			type: String,
			default: 'label'
		},
		// 是否允许点击遮罩关闭选择器
		closeOnClickOverlay: {
			type: Boolean,
			default: true
		},
		// 每列中可见选项的数量
		visibleItemCount: {
			type: Number,
			default: 5
		},
		// 加载状态
		loading: {
			type: Boolean,
			default: false
		},
	},
	name: 'sk-picker',
	data() {
		return {};
	},
	computed: {
		visible: {
			get() {
				return this.show;
			},
			set(val) {
				this.$emit('update:show', val);
			}
		}
	},
	methods: {
		close() {
			this.visible = false;
			this.$emit('close');
		},
		cancel() {
			this.visible = false;
			this.$emit('cancel');
		},
		confirm(e) {
			this.$emit('confirm', e);
		}
	}
};
</script>

<style lang="scss" scoped>
	 .sk-picker {
		/deep/ .u-picker__view__column__item {
			color: $uni-color-subtitle;
		}
	}
</style>
