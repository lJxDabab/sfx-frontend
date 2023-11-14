<template>
  <div>
    <div id="main" style="width: 1000px; height: 500px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    ticker: {
      type: String,
      required: true,
    },
    KData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      stockName: "",
    };
  },
  watch: {
    KData: {
      handler(newdata, olddata) {
        console.debug("Newdata");
        // console.log(newdata);
        this.drawK(newdata);
      },
      deep: true,
    },
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      const url = `${this.$target}/inc/_ticker/${this.ticker}`;
      this.$http.get(url).then((res) => {
        // console.log(res.data);
        this.stockName = res.data.data.stockName;
      });
    },
    drawK(res) {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      //需要提供一个div 给他宽高框框才可以画图，
      const upColor = "#ec0000";
      const upBorderColor = "#8A0000";
      const downColor = "#00da3c";
      const downBorderColor = "#008F28";
      // Each item: open，close，lowest，highest
      //对传来的数据进行格式处理，参考
      const data0 = splitData(
        initData(res, "day", "open", "high", "low", "close")
      );

      //除了data其他可以照抄官网的数据处理initData()方法
      function initData(data, day, open, high, low, close) {
        let barValue = [];
        if (data) {
          data.forEach((item) => {
            let outValue = [];
            outValue[0] = item.day;
            outValue[1] = item.open;
            outValue[2] = item.close;
            outValue[3] = item.low;
            outValue[4] = item.high;
            barValue.push(outValue);
          });
        }
        // this.valueBar = barValue;
        return barValue;
      }
      function splitData(rawData) {
        const categoryData = [];
        const values = [];
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1)[0]);
          values.push(rawData[i]);
        }
        return {
          categoryData: categoryData,
          values: values,
        };
      }
      function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push("-");
            continue;
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            sum += +data0.values[i - j][1];
          }
          result.push(sum / dayCount);
        }
        return result;
      }
      myChart.setOption({
        //这里需要使用myChart.setOption(option);
        title: {
          text: `${this.stockName}(${this.ticker})`,
          left: 0,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: ["日K", "MA5", "MA10", "MA20", "MA30"],
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%",
        },
        xAxis: {
          type: "category",
          data: data0.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: "dataMin",
          max: "dataMax",
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true,
          },
        },
        dataZoom: [
          {
            type: "inside",
            start: 50,
            end: 100,
          },
          {
            show: true,
            type: "slider",
            top: "90%",
            start: 50,
            end: 100,
          },
        ],
        series: [
          {
            name: "日K",
            type: "candlestick",
            data: data0.values,
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor,
            },
            markPoint: {
              label: {
                formatter: function (param) {
                  return param != null ? Math.round(param.value) + "" : "";
                },
              },
              data: [
                {
                  name: "Mark",
                  coord: ["2013/5/31", 2300],
                  value: 2300,
                  itemStyle: {
                    color: "rgb(41,60,85)",
                  },
                },
                {
                  name: "highest value",
                  type: "max",
                  valueDim: "highest",
                },
                {
                  name: "lowest value",
                  type: "min",
                  valueDim: "lowest",
                },
                {
                  name: "average value on close",
                  type: "average",
                  valueDim: "close",
                },
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + "<br>" + (param.data.coord || "");
                },
              },
            },
            markLine: {
              symbol: ["none", "none"],
              data: [
                [
                  {
                    name: "from lowest to highest",
                    type: "min",
                    valueDim: "lowest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      show: false,
                    },
                    emphasis: {
                      label: {
                        show: false,
                      },
                    },
                  },
                  {
                    type: "max",
                    valueDim: "highest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      show: false,
                    },
                    emphasis: {
                      label: {
                        show: false,
                      },
                    },
                  },
                ],
                {
                  name: "min line on close",
                  type: "min",
                  valueDim: "close",
                },
                {
                  name: "max line on close",
                  type: "max",
                  valueDim: "close",
                },
              ],
            },
          },
          {
            name: "MA5",
            type: "line",
            data: calculateMA(5),
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: "MA10",
            type: "line",
            data: calculateMA(10),
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: "MA20",
            type: "line",
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: "MA30",
            type: "line",
            data: calculateMA(30),
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
        ],
      });
    },
  },
};
</script>

<style scoped></style>
