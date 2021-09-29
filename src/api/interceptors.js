export default function (api) {
  //API攔截
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
