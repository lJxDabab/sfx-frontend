<!-- 整个网页的bar -->
<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <router-link to="/">
        <v-btn prepend-icon="mdi-finance" variant="text">
        </v-btn>
        SmartFinanceX
      </router-link>
    </v-app-bar-title>


    <router-link :to="{ name: 'Dashboard' }">
      <v-btn prepend-icon="mdi-star-box" variant="text">
        选股
      </v-btn>
    </router-link>
    <router-link :to="{ name: 'SearchView' }">
      <v-btn prepend-icon="mdi-cloud-search-outline" variant="text">
        搜索
      </v-btn>
    </router-link>
    <router-link :to="{ name: 'News' }">
      <v-btn prepend-icon="mdi-newspaper-variant-outline" variant="text">
        资讯
      </v-btn>
    </router-link>
    <!-- <router-link :to="{ name: 'IncInfo', query: { ticker: '000001' } }">
      <v-btn prepend-icon="mdi-newspaper-variant-outline" variant="text">
        公司
      </v-btn>
    </router-link> -->
    <a href="https://sfx.antio2.cn">
      <v-btn prepend-icon="mdi-file-sign" variant="text">
        文档
      </v-btn>
    </a>

  </v-app-bar>
  <!-- <search-bar /> -->
</template>
<script setup>
// import SearchBar from '@/components/SearchBar'
</script>

<script >
//
export default {
  name: "App",

  components: {
    // SearchBar: () => import("@/components/SearchBar"),
  },
  data: () => ({}),
};
</script>
