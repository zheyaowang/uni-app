

## GUI-Table 表格
基于uni-table表格二次封装，支持columns配置化、固定表头、固定列、插槽、分页、数据格式化、数据快捷运算等功能

> 组件名：``g-ui-table``

### 使用前请下载decimal.js及moment
> npm install decimal.js moment --save -D

### 注意！！！！！！
1、因小程序的样式隔离问题，导致固定表头固定列等功能在小程序下无法生效，暂时没想到解决方法，如果有大佬知道如何解决，可以留言

2、合计的配置keys权重小于key，不影响之前配置key的用户使用

3、同第一条的原因，在columns内配置headerStyle时，background会有样式问题

4、因个人原因，现在无法测试APP端功能，所以有APP问题的用户请自行解决（源码自己改，改完可以留言告诉我下

## API

### Table Props
| 属性名 | 类型 | 默认值 | 可选值 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| data | Array | [] | - | 表格数据 |
| columns | Array | [] | - | 表格列配置，详细查看 [下表](#columns) |
| totalConfig | Object/Boolean/null | null | - | 表格底部合计配置，详细查看 [下表](#total) |
| pagination | Object/Boolean/null | null | - | 分页配置，详细查看 [下表](#pagination) |
| localPaging | Boolean | false | true | 是否开启本地分页，配置pagination后有效 |
| border | Boolean | false | true | 是否有竖线 |
| stripe | Boolean | false | true | 是否显示斑马线，小程序下无效 |
| type | String | '' | 'selection' | 值为type="selection" 时开启多选 |
| emptyText | String | '没有更多数据' | - | 空数据时显示的文本内容 |
| loading | Boolean | false | true | 显示加载中 |
| rowKey | String | '' | - | 多选时返回值的key |
| fixedHeader | Boolean | false | - | 是否固定表头，设置为true时必须设置高度，小程序下无效 |
| height | String/Number | 0 | - | 表格高度，小程序下无效 |
| headerBg | String | '#FFFFFF' | - | 表头背景色，权重小于columns的headerStyle，小程序下无效 |

### <a name="columns"> columns </a>
| 属性名 | 类型 | 默认值 | 可选值 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| title | String | '' | - | 表头名称 |
| width | String | - | - | 单元格宽度 |
| align | String | left | left/center/right | 表头对齐方式 |
| key | String | '' | - | 列数据在数据项中对应的 key |
| type | String | '' | sort/number/price/date/dict/array/add/sub/mul/div/percent | 列数据处理方式，详细查看 [下表](#columnType) |
| precision | String/Number | 2 | - | type="number/price/add/sub/mul/div/percent"时，保留几位小数 |
| round | String | 'ROUND_HALF_UP' | - |  type="number/price/add/sub/mul/div/percent"时，decimal省略方法，默认四舍五入 详情查看 [decimal官网](http://mikemcl.github.io/decimal.js/#modes) |
| symbol | String | '¥'/',' | - | type="price"时的价格单位或type="array"时的分割单位 |
| format | String | 'YYYY-MM-DD HH:mm:ss' | - | type="date"时的时间格式 |
| dict | Array | [{ name: '是', value: '1' },{ name: '否', value: '0' }] | - | type="dict"时的校验字典 |
| nameKey | String | 'name' | - | type="dict/array"时字典的名称key |
| valueKey | String | 'value' | - | type="dict"时字典的值key |
| argKeys | Array | [] | - | type="add/sub/mul/div/percent"时运算值的key |
| slot | Boolean | false | true | 是否启用插槽，详细查看下方 [说明](#slot) |
| headerStyle | Object | - | - | 表头自定义style样式 |
| cellStyle | Object | - | - | 列自定义style样式 |
| filterType | String | - | search/select/date/range | 筛选类型 |
| filterData | Array | - | - | filterType="select"时的筛选数据 |
| sortable | Boolean | false | true | 是否启用排序 |
| left | String | '' | left/right | 固定列方向，开启左固定时，多选标格的多选框必然固定在第一列，小程序下无效 |

#### filter-data 示例
```
[{
	text: "", //显示
	value: "" // 值
}]
```
	
### <a name="columnType"> columns type </a>
| 类型 | 说明 |
| ---- | ---- |
| sort | 排序 |
| number | 使用decimal格式化数字，默认保留2位小数 |
| price | 转换为千分符格式数字并增加单位符号，默认'¥' |
| date | 时间格式化，默认格式'YYYY-MM-DD HH:mm:ss' |
| dict | 字典匹配，默认dict=[{ name: '是', value: '1' },{ name: '否', value: '0' }] |
| array | 数组平铺，例：[{ name: 'name1' },{ name: 'name2' }] = 'name1,name2' |
| add | 相加，将argKeys对应的值相加，如key对应的值不存在则0 |
| sub | 递减，将argKeys对应的值递减，如key对应的值不存在则0，首个key为减母 |
| mul | 相乘，将argKeys对应的值相乘，如key对应的值不存在则1 |
| div | 递除，将argKeys对应的值递除，如key对应的值不存在则1，首个key为被除数，被除数不存在则为0 |
| percent | 百分比，按递除规则计算 |


#### 示例
```
colums: [
	{ title: '排序' ... type: 'sort' },	// 1
	{ title: '数字' ... key: 'number', type: 'number', precision: 2 },	// 999999.99
	{ title: '价格' ... key: 'price', type: 'price', precision: 2, symbol: '¥' },	// ¥999,999.99
	{ title: '时间' ... key: 'date', type: 'date', format: 'YYYY-MM-DD' },	// 2023-02-27
	{ title: '字典' ... key: 'dict', type: 'dict' },	// 是
	{ title: '数组' ... key: 'array', type: 'array' },	// name1,name2
	{ title: '相加' ... argKeys: ['num1', 'num2', 'num3'], type: 'add' },	// 333
	{ title: '递减' ... argKeys: ['num1', 'num2', 'num3'], type: 'sub' },	// 111
	{ title: '相乘' ... argKeys: ['num1', 'num2', 'num3'], type: 'mul' },	// 24642
	{ title: '递除' ... argKeys: ['num1', 'num2', 'num3'], type: 'div' },	// 0.5
	{ title: '百分比' ... argKeys: ['num1', 'num2', 'num3'], type: 'percent' },	// 50.00%
]
data: [
	{ number: '999999.990000', price: '999999.990000', date: '2023-02-27T12:36:58', dict: '1', array: [{ name: 'name1' },{ name: 'name2', num1: '111', num2: '222', num3: null }]}
]
```
### <a name="pagination"> pagination </a>
| 属性名 | 类型 | 默认值 | 可选值 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| page | Number/String | '' | - | 当前页 |
| size | Number/String | - | - | 每页数据量 |
| total | Number/String | - | - | 数据总量 |
| showIcon | Boolean | true | false | 是否以 icon 形式展示按钮 |
| prevText | String | '上一页' | - | 左侧按钮文字 |
| nextText | String | '下一页' | - | 右侧按钮文字 |

### <a name="total"> total config </a>
| 属性名 | 类型 | 默认值 | 可选值 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| key | String | '' | - | 合计项的key |
| keys | Array | '' | - | 合计项的keys, 权重小于key |
| symbol | String | '合计：' | - | 合计数据前的标识 |
| precision | Number/String | 2 | - | 数据保留几位小数 |
| round | String | 'ROUND_HALF_UP' | - | 数据省略方式，默认四舍五入 |
| style | Object | {} | - | 合计内联样式 |

### <a name="slot"> slot </a>
#### Tip 因微信小程序框架问题，暂不支持具名插槽传值，所以采用匿名插槽，按column配置排序
```
 <g-ui-table :columns="columns">
	 <template slot-scope="{value, row, col, index}">
	   {{ col.title }} // slot-1
	   {{ value }} // slot-1
	 </template>
	 <template slot-scope="{value, row, col, index}">
	   {{ col.title }} // slot-2
	   {{ value }} // 11
	 </template>
 </g-ui-table>
 
 columns: [
	 { title: 'slot-1', key: 'name' slot: true },
	 { title: 'slot-2', key: 'age' slot: true }
 ]
 data: [
	 { name: 'slot-1', age: 11 },
	 { name: 'slot-2', age: 14 }
 ]
```

### Table Events
| 事件名称 | 说明 | 返回参数 |
| ---- | ---- | ---- |
| pageChange | 分页时会触发该事件 | Function({Number:page, Number:size}) |
| selectionChange | 多选变化时会触发该事件 | Function({Array:[data], Array:[index]}) |
| sortChange | 点击排序时会触发该事件 | Function({String:order}) |
| filterChange | 筛选数据时会触发该事件 | Function({String/Array:filter, String:filterType}) |

### Table Methods
#### Tip 因微信小程序框架问题，暂不支持如下方法
| 方法名称 | 说明 | 参数 |
| ---- | ---- | ---- |
| selectionAll | 选中全部行 | - |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | Function(Array:[行索引],Boolean:selected) |
| clearSelection | 用于多选表格，清空用户的选择 | - |
| toggleAllSelection | 用于多选表格，切换所有行的选中状态 | - |
