export default class CommentsChartService {
  static getComments() {
    return new Promise((resolve, reject) => {
      let data = getCommentsData();
      console.log("QQQQQQQQQQQQQQQQQ", data);
      data ? resolve(data) : reject('Error');
    })
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getCommentsData() {
  let comment = [];
  let date = [];
  for (let i = 0; i < 12; i++) {
    comment[i] = getRandomInt(100);
    date[i] = (i+1)+'.01.2020';
  }

  let data = {
    comment: comment,
    date: date
  }
  return data;
}
