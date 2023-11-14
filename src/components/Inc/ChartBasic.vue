<template>
  <div class="frame">
    <div class="mychart" id="main" style="width: 750px; height: 400px"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  props: {
    chartdata: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      data: {},
    };
  },
  watch: {
    chartdata: {
      handler(newdata, olddata) {
        console.debug("newdata");
        // console.log(newdata);
        // this.convert(this.category);
        this.draw(newdata);
      },
      deep: true,
    },
  },
  methods: {
    // convert(category) {
    //   if (category == 1) {
    //     this.name = "净利润";
    //   } else if (category == 2) {
    //     this.name = "总收入";
    //   } else if (category == 3) {
    //     this.name = "总成本";
    //   } else if (category == 4) {
    //     this.name = "归母净利润";
    //   } else {
    //     this.name = "扣非净利润";
    //   }
    // },
    //画公司价值图
    draw(data) {
      // var data = data1.finanace_data;
      // console.log(data);
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: `公司${this.name}变化`,
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            // 自定义tooltip内容
            var text = "";
            params.forEach(function (param) {
              var name = param.name;
              var value = param.value;
              text += name + "<br/>" + "市值：" + value * 1000000 + "<br/>";
            });
            return text;
          },
        },
        xAxis: {
          type: "category",
          // data: data.value.map((d) => d.date),
          data: data && data.value ? data.value.map((d) => d.date) : [], // 添加防御性处理
        },
        yAxis: {
          name: "10^6",
          type: "value",
        },
        series: [
          {
            name: "市值",
            // data: data.value.map((d) => d.value / 1000000),
            data:
              data && data.value
                ? data.value.map((d) => d.value / 1000000)
                : [], // 添加防御性处理
            type: "line",
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.frame {
  width: 800px;
  height: 400px;
}
/* .mychart {
    display: inline-block;
  } */
</style>
