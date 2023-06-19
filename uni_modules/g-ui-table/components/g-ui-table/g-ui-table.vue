<template>
  <view>
    <uni-table
      ref="gTable"
      :data="innerData"
      :loading="innerLoading"
      :border="border"
      :type="type"
      :stripe="stripe"
      :empty-text="emptyText"
      :rowKey="rowKey"
	  :style="tableHeight"
      @selection-change="selectionChange">
      <uni-tr
        :class="{'g-table-header': fixedHeader, 'g-table-fixed-header': fixedLeftList.length }"
        :style="{ backgroundColor: headerBg }">
		<uni-th
		  v-for="(th, thIndex) in columns"
		  :key="thIndex"
		  :width="th.width"
		  :align="th.align"
		  :filter-type="th.filterType"
		  :filter-data="th.filterData"
		  :sortable="th.sortable"
		  @sort-change="sortChange"
		  @filter-change="filterChange"
		  :style="[fixedStyle(th, thIndex), headerChildrenBg(th)]">
		  <text :style="[th.headerStyle]">{{ th.title }}</text>
		</uni-th>
      </uni-tr>
      <uni-tr :class="{'g-table-fixed': fixedLeftList.length }" v-for="(row, rowIndex) in innerData" :key="rowIndex">
        <uni-td
          v-for="(col, colIndex) in columns"
          :key="colIndex"
          :align="col.align"
          :style="[fixedStyle(col, colIndex)]">
          <template v-if="col.slot">
            <slot :value="row[col.key]" :row="row" :index="rowIndex" :col="col" />
          </template>
          <template v-else>
            <text :style="[col.cellStyle]">{{ formatData(row[col.key], col, row, rowIndex) }}</text>
          </template>
        </uni-td>
      </uni-tr>
    </uni-table>
    <view v-if="totalConfig" class="table-total" :style="[defaultTotalConfig.style]">{{ calculateTotal }}</view>
    <view class="pagination-box" v-if="pagination">
      <uni-pagination
        v-model="innerPage.page"
        :page-size="innerPage.size"
        :total="innterTotal"
        :show-icon="defaultPagination.showIcon || true"
        :prev-text="defaultPagination.prevText"
        :next-text="defaultPagination.nextText"
        @change="pageChange" />
    </view>
  </view>
</template>

<script>
import * as fmfs from '../../libs/format.js'
import * as fdfs from '../../libs/fast_decimal.js'
import props from './props.js'
export default {
  name: 'GUiTable',
  mixins: [props],
  data() {
    return {
      innerLoading: false,
      innterTotal: 0,
      innerPage: {
        page: 1,
        size: 10
      },
      innerData: [],
      defaultPagination: {
        showIcon: true,
        prevText: '上一页',
        nextText: '下一页'
      },
      defaultTotalConfig: {
        key: '',
        symbol: '合计：',
        precision: 2,
        round: 'ROUND_HALF_UP',
        style: {}
      },
      selectData: [],
      fixedLeftList: [],
      fixedRightList: []
    }
  },
  watch: {
    loading: {
      handler(val) {
        this.innerLoading = val
      },
      deep: true
    },
    pagination: {
      handler(val) {
		if(this.localPaging) {
		  this.innterTotal = val.total
		  this.innerPage = {
			page: val.page,
			size: val.size
		  }
		  Object.assign(this.defaultPagination, val)
		}
      },
      deep: true,
      immediate: true
    },
    data: {
      handler(val) {
        if (this.localPaging) {
          this.pageChange({
            current: 1
          })
        } else {
          this.innerData = val
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    calculateTotal() {
      Object.assign(this.defaultTotalConfig, this.totalConfig)
      const {
        key,
		keys,
        symbol,
        precision,
        round
      } = this.defaultTotalConfig
      const data = JSON.parse(JSON.stringify(this.innerData))
      let res = 0
      data.forEach(value => {
		if (key) {
			const val = value[key]
			res = fdfs.add([res, val], precision, round)
		} else if (Array.isArray(keys) && keys.length) {
			keys.forEach(key_ => {
				const val = value[key_]
				res = fdfs.add([res, val], precision, round)
			})
		}
      })
      return `${symbol}${res}`
    },
	tableHeight() {
		const { fixedHeader, height } = this
		const heightStyle = fixedHeader ? `height: ${height}rpx` : ''
		return heightStyle
	},
    headerChildrenBg() {
      return (th) => {
        const style = {
          backgroundColor: 'inherit'
        }
        // 如果设置了背景颜色，则覆盖
        if (th.headerStyle && th.headerStyle.backgroundColor) {
          style.backgroundColor = th.headerStyle.backgroundColor
        }
        return style
      }
    },
    fixedStyle() {
      return ({
        fixed,
        title
      }, index) => {
        const style = {
          backgroundColor: 'inherit'
        }
        if (fixed) {
          const offset = this.queryHtmlOffset({
            fixed,
            title
          })
          style.position = 'sticky'
          style[fixed] = offset + 'px'
          style.zIndex = fixed === 'left' ? 9998 : 9997
          style.boxSizing = 'border-box'
        }
		// 处理右固定边框问题
        const nextFixed = this.columns[index + 1]?.fixed
        if (nextFixed) {
          style.borderRight = 'none'
        }
        if (fixed && index > 0) {
          style.borderLeft = '1px #ebeef5 solid'
        }
        return style
      }
    }
  },
  created() {
    this.queryFixed()
  },
  methods: {
    queryFixed() {
      this.fixedLeftList = this.columns.filter(item => item.fixed === 'left' && item.width)
      this.fixedRightList = this.columns.filter(item => item.fixed === 'right' && item.width).reverse()
    },
    queryHtmlOffset({
      title,
      fixed
    }) {
      const key = fixed === 'left' ? 'fixedLeftList' : 'fixedRightList'
      const fixedIndex = this[key].findIndex(item => item.title === title)
      const widthList = this[key].slice(0, fixedIndex).map(item => item.width)
      // 全选框默认固定在左边
      if (fixed === 'left' && this.type === 'selection') {
        widthList.push('40')
      }
      const offset = fdfs.add(widthList, 0)
      return offset
    },
    formatData(val, col, row, index) {
      const {
        type,
        symbol,
        precision,
        round,
        format,
        dict,
        nameKey,
        valueKey,
        argKeys
      } = col
      let res = val
      const args = []
      if (['add', 'sub', 'mul', 'div', 'percent'].includes(type) && !fmfs.empty(argKeys)) {
        argKeys.forEach(key => {
          args.push(row[key])
        })
      }
      switch (type) {
        case 'sort':
          res = index + 1
          break
        case 'number':
          res = fmfs.number(val, precision, round)
          break
        case 'price':
          res = fmfs.price(val, symbol, precision, round)
          break
        case 'date':
          res = fmfs.date(val, format)
          break
        case 'dict':
          res = fmfs.dict(val, dict, nameKey, valueKey)
          break
        case 'array':
          res = fmfs.array(val, nameKey, symbol)
          break
        case 'add':
          res = fdfs.add(args, precision, round)
          break
        case 'sub':
          res = fdfs.sub(args, precision, round)
          break
        case 'mul':
          res = fdfs.mul(args, precision, round)
          break
        case 'div':
          res = fdfs.div(args, precision, round)
          break
        case 'percent':
          res = fdfs.percent(args, precision, round, symbol)
          break
      }
      return res
    },
    pageChange(e) {
      if (this.localPaging && this.pagination) {
        this.innerLoading = true
        this.innerPage.pageNum = e.current
        const startIndex = (e.current - 1) * this.innerPage.size
        const endIndex = startIndex + this.innerPage.size
        this.innerData = this.data.slice(startIndex, endIndex)
        this.innerLoading = false
      } else {
        this.$emit('pageChange', {
          page: e.current,
          size: this.innerPage.size
        })
      }
      if (this.type === 'selection' && !fmfs.empty(this.selectData)) {
        this.clearSelection()
      }
    },
    selectionChange(e) {
      const {
        index
      } = e.detail
      const data = this.innerData.filter((_, idx) => index.includes(idx)).map(item => this.rowKey ? item[this
        .rowKey] : item)
      this.selectData = data
      this.$emit('selectionChange', {
        data,
        index
      })
    },
    sortChange(e) {
      this.$emit('sortChange', e)
    },
    filterChange(e) {
      this.$emit('filterChange', e)
    },
    selectionAll() {
      this.$refs.gTable.selectionAll()
    },
    toggleRowSelection(row, selected) {
      this.$refs.gTable.toggleRowSelection(row, selected)
    },
    clearSelection() {
      this.$refs.gTable.clearSelection()
    },
    toggleAllSelection() {
      this.$refs.gTable.toggleAllSelection()
    }
  },
  options: { styleIsolation: 'shared' },
}
</script>

<style scoped>
	@import './index.scss'
</style>
