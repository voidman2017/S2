// App.vue
<script lang="ts">
import type { S2DataConfig, S2Options } from '@antv/s2';
import { SheetComponent } from '@antv/s2-vue';
import { defineComponent, onMounted, reactive, ref, shallowRef } from 'vue';
import "@antv/s2-vue/dist/style.min.css";

const s2DataConfig: S2DataConfig = {
  fields: { //维度指标 。配置表格的维度域，即对应行列维度。 对应表格左上方「角头」
    rows: ['province', 'city'], // 行维度 。会根据行维度的项数增加「角头」的最后一行的列数 。并结合data数据，影响「行头」的行数
    columns: ['type', 'level'], //列维度。 会根据列维度的项数增加「角头」的行数。并结合  data 数据，影响「数据」的列数
    values: ['price', 'discount'], //指标维度。
  },
  data: [ //原始数据
    /* data中每一项，会根据属性集合，增加行头项和列头项。
      - 行维度。
      「角头」的最后一行，会根据 fileds.rows的数组长度，分割成对应列。
      根据fileds.rows中定义的key，结合 data 进行组合，生成对应的行头集合。顺序以遍历fileds.rows的方式进行。
      data中共包含不重复的 fileds.rows[0] 有 N 种，会在行头第 0 列生成 N 行。 然后再查找 data 中共包含不重复（值不同，父节点不同）的 fileds.rows[1] 有 C 中， 会在行头的第 1 行生成 C 行，同时将属于相同的 fileds.rows[0] 的进行合并单元格处理。循环往复，直至filed.rows遍历完
      以当前数据为例：遍历 fileds.rows ：
      第一项fileds.rows[0] 为 province，data中共包含 4 种类型 province：浙江、吉林、江苏、广东，生成 4 行。
      第二项fileds.rows[1] 为 city。provice 为 浙江的 city共有：杭州、舟山，则在浙江所处的行拆分单元格2格对应杭州、舟山 ； provice 为 吉林 的 city共有：长春、白山，则在浙江所处的行拆分单元格2格对应长春、白山；provice 为 江苏 的 city共有：江阴市，则在 江苏 所处的行拆分单元格1格对应 江阴市；provice 为 广东 的 city共有：江阴市，则在 广东 所处的行拆分单元格1格对应 江阴市
      至此fields.rows遍历完毕，行数拆分完成，共计 2 + 2 + 1 + 1 = 6 行
      - 列维度
      「角头」除最后一行，会根据fileds.columns的数组长度，分割成对应列。
        根据fileds.columns中定义的key，结合 data 的数据，影响 「数据」的列数。顺序以遍历fileds.columns的方式进行
        data中共包含不重复的 fileds.columns[0] 有 N 种，会在列头第 0 列生成 N 列。 然后再查找 data 中共包含不重复（值不同，父节点不同）的 fileds.rows[1] 有 C 中， 会在列头的第 1 行生成 C 列，同时将属于相同的 fileds.rows[0] 的进行合并单元格处理。循环往复，直至filed.columns 遍历完
      - 指标维度
       列头最后一行。会结合当前列中是否包含指标维度，进行列拆分
    */
    {
      province: "浙江",
      city: "杭州",
      type: "笔",
      level: "中",
      price: "1",
    },
    {
      province: "浙江",
      city: "舟山",
      type: "笔",
      level: "高",
      price: "17",
    },
    {
      province: "浙江",
      city: "杭州",
      type: "纸",
      price: "1",
    },
    {
      province: "浙江",
      city: "舟山",
      type: "纸",
      discount: "17",
    },
    {
      province: "吉林",
      city: "长春",
      type: "笔",
      price: "8",
    },
    {
      province: "吉林",
      city: "白山",
      type: "笔",
      level: '高',
      price: "12",
      discount: '70%'
    },
    {
      province: "江苏",
      city: "江阴市",
      type: "笔",
      level: "高",
      price: "11",
      discount: "80%",
    },
    {
      province: "广东",
      city: "江阴市",
      type: "笔",
      level: "高",
      price: "19",
      discount: "90%",
    },
  ]
};


const s2Options: S2Options = {
  width: 900,
  height: 480,
  hierarchyType: 'tree'

}

export default defineComponent({
  setup() {
    // dataCfg 数据字段较多，建议使用 shallow, 如果有数据更改直接替换整个对象
    const dataCfg = shallowRef(s2DataConfig);
    const options: S2Options = reactive(s2Options);

    return {
      dataCfg,
      options,
    };
  },
  methods: {
    change: function () {
      this.dataCfg.data[0].price += '1'
    }
  },

  components: {
    SheetComponent,
  },
});
</script>

<template>
  <SheetComponent :dataCfg="dataCfg" :options="options" />
  <button @click="change">change</button>
</template>