<template>
	<u-modal
		class="sk-modal"
		:show="visible"
		:title="title"
		:content="content"
		:showCancelButton="showCancelButton"
		@close="close"
		@cancel="cancel"
		@confirm="confirm"
	>
		
	</u-modal>
</template>

<script>
import props from './props.js';

export default {
	name: 'sk-modal',
	mixins: [uni.$u.mpMixin, uni.$u.mixin, props],
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
			this.visible = false;
			this.$emit('confirm', e);
		}
	}
};
</script>

<style lang="scss"></style>
