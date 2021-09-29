/**
 * 時間物件轉字串
 * @param {Object} dateObj 時間物件
 */
export const dateToStr = (dateObj) => {
  return (
    dateObj.getFullYear() +
    "-" +
    ("0" + (dateObj.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + dateObj.getDate()).slice(-2)
  );
};
