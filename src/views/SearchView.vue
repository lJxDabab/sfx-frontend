<template>
  <v-container>
    <SearchBar :way="way" :msg="msg" @search="search"> </SearchBar>
    <v-container v-show="searched">
      <v-chip href="#result" prepend-icon="mdi-bulletin-board" variant="text">
        查询到{{ cnt }}条结果
      </v-chip>
      <v-divider></v-divider>
      <v-list>
        <!-- this.stockName = res.data.data.stockName;
                    this.field = res.data.data.industryClass;
                    this.listDate = res.data.data.listDate.split("T")[0];
                    this.message = res.data.data.description; -->
        <IncCard
          @fresh="fresh"
          v-for="result in results"
          :loaded="true"
          :loadedfield="result.industryClass"
          :ticker="result.ticker"
          :loadedstockName="result.stockName"
          :loadedlistDate="result.listDate"
          :loadedmsg="result.description"
        >
        </IncCard>
      </v-list>
      <v-bottom-navigation class="align-center">
        <v-chip
          variant="text"
          v-on:click="subpage"
          v-show="page > 1"
          prepend-icon="mdi-skip-previous"
          rounded="xl"
        >
          上一页
        </v-chip>
        <v-chip variant="text"> {{ page }}/{{ maxpage }} </v-chip>
        <v-chip
          variant="text"
          v-on:click="addpage"
          v-show="page < maxpage"
          prepend-icon="mdi-skip-next"
          rounded="xl"
        >
          下一页
        </v-chip>
      </v-bottom-navigation>
    </v-container>
  </v-container>
</template>
<script setup>
import SearchBar from "@/components/SearchBar";
import IncCard from "@/components/IncCard";
</script>
<script>
export default {
  name: "SearchView",

  components: {
    // SearchBar: () => import("@/components/SearchBar"),
  },
  data: () => ({
    results: [],
    page: 1,
    msg: "",
    way: "关键词",
    searched: false,
    cnt: "",
    response: {},
    maxpage: 0,
    per_page: 10,
  }),
  watch: {
    page() {
      this.search(this.way, this.msg);
    },
  },
  created() {
    // 从本地存储中加载数据
    this.getwatchlist();
  },
  methods: {
    getwatchlist() {
      const watchlists = JSON.parse(localStorage.getItem("watchlists"));
      // console.log(watchlists)
      if (watchlists) {
        this.watchlists = watchlists;
      }
    },
    fresh() {
      this.getwatchlist();
    },
    search(way, msg2) {
      this.way = way;
      this.msg = msg2;
      this.searched = true;
      // console.log("search")
      if (way == "关键词") {
        const url = `${this.$target}/_search/_all/${msg2}/${this.page}`;
        console.log(url);
        let that = this;
        this.$http.get(url).then((res) => {
          if (res.data.code != 200) {
            this.results = [];
            this.cnt = 0;
          } else {
            this.results = res.data.data;
            this.cnt = res.data.msg;
            this.maxpage = Math.ceil(this.cnt / this.per_page);
          }
        });
      }
      if (way == "股票代码") {
        const url = `${this.$target}/_search/_ticker/${msg2}`;
        console.log(url);
        let that = this;
        this.$http.get(url).then((res) => {
          if (res.data.code != 200) {
            this.results = [];
            this.cnt = 0;
          } else {
            this.results = res.data.data;
            this.cnt = res.data.msg;
            this.maxpage = Math.ceil(this.cnt / this.per_page);
          }
        });
      }
      console.log(this.results);
    },
    addpage() {
      if (this.page >= this.maxpage) {
        this.page = this.maxpage;
      } else {
        this.page++;
      }
    },
    subpage() {
      if (this.page <= 1) {
        this.page = 1;
      } else {
        this.page--;
      }
    },
  },
};
</script>
