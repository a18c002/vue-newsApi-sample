<template>
  <div class="newsPage">
    <Header />
    <main>
      <NewsFilter
        :defaultKeyWord="defaultKeyWord"
        :pageSize="pageSize"
        :nowPage="nowPage"
        @sourceChanged="sourceChanged"
        @pageChange="pageChange"
        @changeLoadingStatus="changeLoadingStatus"
      />
      <NewsList
        :totalResults="totalResults"
        :pageSize="pageSize"
        :newsData="newsData"
        :nowPage="nowPage"
        :loading="loading"
        @pageChange="pageChange"
      />
    </main>
  </div>
</template>

<script>
import NewsFilter from "@/components/newsFilter/index.vue";
import NewsList from "@/components/newsList/index.vue";
import Header from "@/components/header/index.vue";

export default {
  name: "Home",
  data() {
    return {
      defaultKeyWord: "COVID-19",
      pageSize: 20,
      nowPage: 1,
      newsData: [],
      totalResults: 0,
      loading: true,
    };
  },
  components: {
    NewsFilter,
    NewsList,
    Header,
  },
  methods: {
    sourceChanged(data) {
      this.newsData = data.newsData;
      this.totalResults = data.totalResults;
      this.nowPage = data.page;
    },
    pageChange(p) {
      this.nowPage = p;
    },
    changeLoadingStatus(status) {
      this.loading = status;
    },
  },
};
</script>
