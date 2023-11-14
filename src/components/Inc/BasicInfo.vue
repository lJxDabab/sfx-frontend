<template>
  <v-container>
    <div class="btn">
      <v-btn round @click="getdata(1)" class="botton">净利润</v-btn>
      <v-btn round @click="getdata(2)" class="botton">总收入</v-btn>
      <v-btn round @click="getdata(3)" class="botton">总成本</v-btn>
      <v-btn round @click="getdata(4)" class="botton">归母净利润</v-btn>
      <v-btn round @click="getdata(5)" class="botton">扣非净利润</v-btn>
    </div>
    <div class="chart">
      <my-chart :chartdata="data"></my-chart>
    </div>
    <div class="infor">
      <infor :infor="infor"></infor>
    </div>
  </v-container>
</template>
<script setup></script>
<script>
import myChart from "@/components/Inc/ChartBasic.vue";
import Infor from "@/components/Inc/infor.vue";
export default {
  props: ["ticker"],
  components: {
    myChart,
    Infor,
  },
  data() {
    return {
      data: {},
      infor: {},
    };
  },
  methods: {
    getdata(category) {
      const url = `${this.$target}/inc/_fnc/${this.ticker}/${category}`;
      // console.log(url);
      let that = this;
      this.$http.get(url).then((res) => {
        // console.log(res);
        res.data.data.finanace_data = res.data.data.finanace_data.reverse();
        that.data.value = res.data.data.finanace_data;
        //父组件调用子组件的方法
        // that.$refs.myChart.draw(this.data);
      });
    },
    search() {
      const url = `${this.$target}/inc/_ticker/${this.ticker}`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res.data.data);
          this.infor = res.data.data;
          this.infor.listDate = res.data.data.listDate.split("T")[0];
        })
        .catch((error) => {
          console.error("Error fetching information:", error);
        });
    },
  },
  mounted() {
    this.search();
    this.getdata(1);
  },
};
</script>

<style scoped>
.btn {
  margin: 5px;
  margin-left: 75px;
  margin-bottom: 20px;
}
.botton {
  /* text-align: center; */
  margin: 0 5px;
}
.chart {
  display: inline-block;
  vertical-align: top;
}
.infor {
  display: inline-block;
  vertical-align: top;
  margin-top: 30px;
}
</style>
