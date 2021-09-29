<template>
  <b-container>
    <NewsDetail ref="newsDetail" />
    <b-row>
      <b-col
        sm="12"
        v-if="newsData.length > 1"
        class="d-flex justify-content-between mb-2"
      >
        <span>第 {{ page }} 頁，共{{ pageCount }}頁</span>
        <span>共 {{ totalResults }} 筆資料</span>
      </b-col>
      <b-col md="12" class="mb-2 d-flex justify-content-center" v-if="loading">
        <b-icon icon="three-dots" animation="cylon" font-scale="4"></b-icon>
      </b-col>
      <b-col
        sm="12"
        v-for="(news, news_ind) in newsData"
        :key="news_ind"
        @click="showNewsDetail(news)"
        v-else
      >
        <div class="news-item border">
          <div
            class="img"
            :style="`background-image: url(${news.urlToImage})`"
          ></div>
          <div class="cont">
            <h5 class="title">{{ news.title }}</h5>
            <div class="depiction">{{ news.description }}</div>
            <div class="info d-flex justify-content-between">
              <span>{{
                news.publishedAt.replace("T", " ").replace("Z", " ")
              }}</span>
              <span>By: {{ news.author }}</span>
            </div>
          </div>
        </div>
      </b-col>
      <b-col sm="12" v-if="newsData.length > 1">
        <b-pagination
          v-model="page"
          :total-rows="totalResults"
          :per-page="pageSize"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NewsDetail from "@/components/newsDetail/index.vue";
export default {
  components: {
    NewsDetail,
  },
  props: {
    newsData: {
      type: Array,
      default: null,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    totalResults: {
      type: Number,
      default: 0,
    },
    nowPage: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    newsData() {},
    page(p) {
      this.$emit("pageChange", p);
    },
    nowPage(p) {
      this.page = p;
    },
    totalResults() {},
    loading() {},
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalResults / this.pageSize);
    },
  },
  data() {
    return {
      listDala: [],
      page: this.nowPage,
    };
  },
  methods: {
    showNewsDetail(data) {
      this.$refs.newsDetail.showNews(data);
    },
  },
};
</script>

<style lang="sass" scoped>
.news-item
  padding: 10px
  margin-bottom: 20px
  display: flex
  cursor: pointer
  .img
    background: #ddd
    height: 150px
    width: 230px
    background-size: cover
    background-repeat: no-repeat
    background-position: center center
    position: relative
    &::before
      content: ""
      height: 100%
      width: 100%
      position: absolute
      top: 0
      background: rgba(0, 0, 0, 0)
  .cont
    padding-left: 10px
    width: calc(100% - 230px)
    display: flex
    flex-direction: column
    justify-content: space-between
    .depiction
      color: #9d9c9c
    // .info
    //   display: flex
    //   justify-content: space-between
  &:hover
    .title
      transition: .3s
      color: #007bff
    .img::before
      background: rgba(0, 0, 0, 0.2)
      transition: .3s
</style>
