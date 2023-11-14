<template>
  <v-card class="mx-auto" max-width="600">
    <v-list v-model:opened="open">
      <v-list-item prepend-icon="mdi-home" title="资讯"></v-list-item>

      <v-list-group value="今日新闻">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="金融日报栏"></v-list-item>
        </template>

        <v-list-group value="Admin">
          <template v-slot:activator="{ props }">
            <v-list-item variant="text" v-bind="props" title="今日精选"></v-list-item>
          </template>

          <v-list-item v-for="([title, icon], i) in admins" :key="i" :title="title" :prepend-icon="icon" :value="title"
            @click="turn2(i)" v-on:mouseover="changepicture1(i)" v-on:mouseout="returnpicture()"></v-list-item>
        </v-list-group>

        <v-list-group value="Actions">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="其他新闻"></v-list-item>
          </template>

          <v-list-item v-for="([title, icon], i) in cruds" :key="i" :value="title" :title="title" @click="turn3(i)"
            v-on:mouseover="changepicture1(5)" v-on:mouseout="returnpicture()" :prepend-icon="icon"></v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-card>
  <v-container class="picture-margin">
    <img v-bind:src="hovernow" class="picture">
  </v-container>
</template>

<script>
export default {
  data: () => ({
    open: ['Users'],
    admins: [
      ['政治局：支持高标准高质量建设雄安新区', 'mdi-account-multiple-outline'],
      ['沪指上半年涨近4%', 'mdi-account-multiple-outline'],
      ['十大牛熊股出炉', 'mdi-account-multiple-outline'],
      ['Lordstown Motors在申请破产后收到纳斯达克交付通知', 'mdi-account-multiple-outline'],
      ['特斯拉、耐克、西格隆治疗公司跻身今日热门股票之列', 'mdi-account-multiple-outline'],
    ],
    cruds: [
      ['【年中盘点】最热十大板块梳理', 'mdi-plus-outline'],
      ['6月30日北向资金最新动向（附十大成交股）', 'mdi-plus-outline'],
      ['中国团队推出世界首颗AI全自动设计CPU', 'mdi-plus-outline'],
      ['歌尔股份：上半年净利润同比预减76%-84%', 'mdi-plus-outline'],
      ['主力复盘：13亿抢筹电池 巨轮智能2连板', 'mdi-plus-outline'],
      ['两年亏掉224亿！股价跌去95% 贵州首家上市公司明日摘牌！', 'mdi-plus-outline'],
      ['A股即将迎来大行情，到底是向上还是向下？就等一个事情落地！', 'mdi-plus-outline'],
      ['存储芯片产业有望复苏 机构预测多股全年业绩增长', 'mdi-plus-outline'],
      ['龙头罕见30cm涨停 北交所这个板块爆发', 'mdi-plus-outline'],
      ['国家大基金频繁出手！半导体设备国产化逻辑持续强化', 'mdi-plus-outline'],
      ['四大关键词浮出水面！私募把脉下半年A股', 'mdi-plus-outline'],
      ['每位投资者都该问自己五个问题', 'mdi-plus-outline'],
      ['华泰证券：优选渠道掌控力等的龙头酒企', 'mdi-plus-outline'],
    ],
    hoverbefore: 'https://th.bing.com/th/id/OIP.BUa-cBK7ZNSAJb6UjFulzQHaE7?w=252&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    hovernow: 'https://th.bing.com/th/id/OIP.BUa-cBK7ZNSAJb6UjFulzQHaE7?w=252&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',

  }),
  methods: {
    turn2(i) {
      switch (i) {
        case 0:
          window.open('https://finance.eastmoney.com/a/202306302766699355.html');
          break;
        case 1:
          window.open('https://finance.eastmoney.com/a/202306302766641745.html');
          break;
        case 2:
          window.open('https://finance.eastmoney.com/a/202306302766746119.html');
          break;
        case 3:
          window.open('https://www.msn.com/en-us/money/companies/lordstown-motors-receives-nasdaq-delisting-notice-after-filing-for-bankruptcy/ar-AA1deMCj?cvid=a156dc45b23b419ebd6bf4e4b03a4104&ei=30');
          break;
        case 4:
          window.open('https://www.msn.com/en-us/money/news/tesla-nike-sigilon-therapeutics-among-top-trending-stocks-today/ar-AA1detDr?cvid=a156dc45b23b419ebd6bf4e4b03a4104&ei=77');
          break;
      }
    },
    turn3(i) {
      switch (i) {
        case 0:
          window.open('https://finance.eastmoney.com/a/202306302766714374.html');
          break;
        case 1:
          window.open('https://finance.eastmoney.com/a/202306302766641745.html');
          break;
        default:
          window.open('https://www.msn.cn/zh-cn?ocid=BHEA000');
          break;
      }
    },
    changepicture1(i) {
      switch (i) {
        case 0:
          this.hovernow = '/src/assets/1.png';
          this.$forceUpdate();
          break;
        case 1:
          this.hovernow = '/src/assets/2.png';
          this.$forceUpdate();
          break;
        case 2:
          this.hovernow = '/src/assets/3.png';
          break;
        case 3:
          this.hovernow = '/src/assets/4.png';
          break;
        case 4:
          this.hovernow = '/src/assets/5.png';
          break;
        case 5:
          this.hovernow = '/src/assets/6.png'
      }
    },
    returnpicture() {
      this.hovernow = this.hoverbefore;
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="scss" scoped>
.picture-margin {
  margin-left: 33%;
  margin-top: 93px;
  margin-bottom: 10px;

}

.picture {
  transform: scale(1.2);
}
</style>
