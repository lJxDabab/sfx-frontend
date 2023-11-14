<template>
  <v-container class="d-flex flex-wrap">
    <p>您的收藏</p>
    <inc-card v-if="watchlists.length" @fresh="fresh" v-for="watchlist in watchlists" :ticker="watchlist" :loaded="false"
      class="" />
    <v-container v-else class="w-50 aligin-center">
      <v-card title="暂无收藏股票" text="去搜索或资讯逛逛吧" class="mycard"></v-card>
    </v-container>
  </v-container>
</template>
<script setup>
import IncCard from "@/components/IncCard.vue";
</script>
<script>
export default {
  name: "Dashboard",
  created() {
    // 从本地存储中加载数据
    this.getwatchlist();
  },
  watch: {
    // 监听 items 数组的变化，并将其保存到本地存储中
    items: {
      handler(newItems) {
        localStorage.setItem("watchlists", JSON.stringify(newItems));
      },
      deep: true,
    },
  },
  methods: {
    getwatchlist() {
      const watchlists = JSON.parse(localStorage.getItem("watchlists"));
      // console.log("[debug] Dashboard " + watchlists)
      if (watchlists) {
        this.watchlists = watchlists;
      }
    },
    fresh() {
      this.getwatchlist();
    },
  },
  components: {
    // IncCard: () => import("@/components/IncCard.vue"),
  },
  data: () => ({
    watchlists: [],
  }),
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.mycard {
  flex: 0 0 300px;
  /* 设置卡片宽度 */
}

.dashcard {
  width: 100px;
  height: 160px;
}
</style>
