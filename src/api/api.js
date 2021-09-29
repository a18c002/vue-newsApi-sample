import axios from "axios";
import Interceptors from "./interceptors";
const awooNews = axios.create({
  baseURL: "https://newsapi.org/v2/everything?apiKey=965b67b40af540419b789b1b3259a598",
});
//API攔截
Interceptors(awooNews);

// 新聞 相關的 api
export const news = {
  /**
   * 取得新聞列表
   * @param {Object} req 請求參數
   */
  getNewsList(req) {
    return awooNews(``, {
      method: "GET",
      params: {
        ...req,
      },
    });
  },
};
