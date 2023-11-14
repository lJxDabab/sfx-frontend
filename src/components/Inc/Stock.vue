<template>
  <v-container>
    <div class="kchart"><k-line :KData="data" :ticker="ticker"></k-line></div>
  </v-container>
</template>
<script setup></script>
<script>
import KLine from "@/components/Inc/KLine.vue";
export default {
  props: ["ticker"],
  components: {
    KLine,
  },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    search() {
      const url = `${this.$target}/stock/k/${this.ticker}/60`;
      this.$http.get(url).then((res) => {
        // console.log(res.data);
        this.data = res.data;
      });
    },
  },
  created() {
    this.search();
  },
};
</script>

<style scoped>
.kchart {
  margin: auto;
  width: 1000px;
  height: 500px;
}
</style>
