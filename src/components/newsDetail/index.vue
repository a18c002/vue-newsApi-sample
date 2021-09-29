<template>
  <b-modal
    v-if="newsData"
    id="newsDelail"
    size="xl"
    :title="newsData.title"
    hide-footer
    @close="close()"
  >
    <b-row>
      <b-col class="mb-3" sm="12" v-if="newsData.urlToImage">
        <b-img :src="newsData.urlToImage" fluid alt="Responsive image"></b-img>
      </b-col>
      <b-col sm="12" class="d-flex justify-content-between info mb-3">
        <span>{{
          newsData.publishedAt.replace("T", " ").replace("Z", " ")
        }}</span>
        <span>By:{{ newsData.author }}</span>
      </b-col>
      <b-col sm="12">
        <p>{{ newsData.content }}</p>
      </b-col>
      <b-col class="source" sm="12"> source: {{ newsData.source.name }} </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      newsData: null,
    };
  },
  methods: {
    showNews(data) {
      this.newsData = data;
      this.$nextTick(() => {
        this.$bvModal.show("newsDelail");
      });
    },
    close() {
      this.newsData = null;
    },
  },
};
</script>

<style lang="sass" scoped>
.info,.source
  color: #777
.source
  text-align: end
</style>
