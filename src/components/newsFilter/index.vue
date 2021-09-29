<template>
  <b-container>
    <b-row>
      <b-col>
        <b-input-group class="mt-3 p-3 border">
          <b-form-input v-model="keyWord"></b-form-input>
          <b-input-group-append>
            <b-button variant="primary" @click="sort()">
              <b-icon icon="search" aria-hidden="true"></b-icon> 搜尋
            </b-button>
            <b-button variant="outline-primary" @click="advanced = !advanced">
              進階搜尋
              <b-icon icon="filter" aria-hidden="true"></b-icon>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-collapse v-model="advanced" class="p-3 border border-top-0">
          <b-col md="4" class="p-0">
            <label>時間區間搜尋</label>
            <date-picker
              v-model="sortTime"
              range
              value-type="format"
            ></date-picker>
          </b-col>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-nav tabs class="mt-3 mb-3 border-bottom">
          <b-nav-item
            :active="sortBy == 'relevancy'"
            @click="sortBy = 'relevancy'"
          >
            相關度
          </b-nav-item>
          <b-nav-item
            :active="sortBy == 'popularity'"
            @click="sortBy = 'popularity'"
          >
            人氣
          </b-nav-item>
          <b-nav-item
            :active="sortBy == 'publishedAt'"
            @click="sortBy = 'publishedAt'"
          >
            發布時間
          </b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { news } from "@/api/api";
import { dateToStr } from "@/common/tools.js";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  props: {
    defaultKeyWord: {
      type: String,
      default: "",
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    nowPage: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    sortBy() {
      this.page = 1;
      this.getData();
    },
    nowPage(p, p_o) {
      this.page = p;
      this.getData().catch((err) => {
        this.page = p_o;
        this.$emit("pageChange", p_o);
        this.$bvModal.msgBoxOk(err.response.data.message, {
          title: "Error",
        });
      });
    },
  },
  components: { DatePicker },
  data() {
    return {
      keyWord: this.defaultKeyWord,
      advanced: false,
      sortTime: [
        dateToStr(new Date(new Date() - 7 * 86400000)),
        dateToStr(new Date()),
      ],
      sortBy: "relevancy",
      isLoading: true,
      page: this.nowPage,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    sort() {
      if (this.keyWord == "") {
        this.$bvModal.msgBoxOk("你必須輸入搜索條件", {
          title: "Error",
        });
        return;
      }
      this.page = 1;
      this.getData();
    },
    getData() {
      this.$emit("changeLoadingStatus", true);
      let reqData = {
        q: this.keyWord,
        sortBy: this.sortBy,
        pageSize: this.pageSize,
        page: this.page,
      };
      if (this.advanced) {
        reqData.from = this.sortTime[0];
        reqData.to = this.sortTime[1];
      }
      return news.getNewsList(reqData)
        .then((res) => {
          this.$emit("changeLoadingStatus", false);
          if (res.status == 200) {
            this.$emit("sourceChanged", {
              totalResults: res.data.totalResults,
              newsData: res.data.articles,
              page: this.page,
            });
          }
        })
        .catch((err) => {
          this.$emit("changeLoadingStatus", false);
          this.$bvModal.msgBoxOk(err.response.data.message, {
            title: "Error",
          });
        });
    },
  },
};
</script>
