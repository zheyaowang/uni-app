import { NAV_BAR_BG_COLOR } from '@/common/util/constants.js';
export default {
	props: {
		// 点击左侧区域(返回图标)，是否自动返回上一页，默认返回
		autoBack: {
			type: Boolean,
			default: true
		},
		// h5返回到原生安卓页面
		backNative: {
			type: Boolean,
			default: false
		},
		// 导航栏是否固定在顶部 默认固定
		fixed: {
			type: Boolean,
			default: true
		},
		// 固定在顶部时，是否生成一个等高元素，以防止塌陷
		placeholder: {
			type: Boolean,
			default: true
		},
		// 导航栏高度(不包括状态栏高度在内，内部自动加上)，单位px
		height: {
			type: [String, Number],
			default: '44px'
		},
		// 标题
		title: {
			type: [String, null],
			default: ''
		},
		// 导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx
		titleWidth: {
			type: [String, Number],
			default: '400rpx'
		},
		// 标题的样式，对象或字符串形式
		titleStyle: {
			type: [String, Object],
			default: () => {
				return {
					color: '#fff',
					textAlign: 'center',
					fontSize: '32rpx',
					fontWeight: 'blod'
				};
			}
		},
		// 左边的提示文字
		leftText: {
			type: String,
			default: ''
		},
		// 左边返回图标的名称，只能为uView自带的图标
		leftIcon: {
			type: String,
			default: 'arrow-left'
		},
		// 左侧返回图标的大小
		leftIconSize: {
			type: [String, Number],
			default: '20px'
		},
		// 左侧返回图标的颜色
		leftIconColor: {
			type: String,
			default: '#fff'
		},
		// 右边的提示文字
		rightText: {
			type: String,
			default: ''
		},
		// 右边返回图标的名称，只能为uView自带的图标
		rightIcon: {
			type: String,
			default: ''
		},
		// 右侧返回图标的颜色
		rightIconColor: {
			type: String,
			default: '#fff'
		},
		// 导航栏背景设置
		bgColor: {
			type: String,
			default: NAV_BAR_BG_COLOR
		},
		// 是否开启顶部安全区适配 默认开启
		safeAreaInsetTop: {
			type: Boolean,
			default: true
		},
		menubar: {
			type: Boolean,
			default: false
		},
		// 下拉菜单
		drapdown: {
			type: Boolean,
			default: true
		},
		options: {
			type: Array,
			default: () => []
		}
	}
}