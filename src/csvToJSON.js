import axios from "axios";

export const exportJSON = async (data, url) => {
  if (url) {
    return await axios.get(url).then((response) => {
      let csv = response.data;
      return {
        input: csv,
        output: getJSON(csv),
      };
    });
  }
  return {
    input: data,
    output: getJSON(data),
  };
};

const getJSON = (data) => {
  let arr = [];
  let rows = data.split("\r\n");
  let keys = rows[0].split(",");

  for (let i = 1; i < rows.length; i++) {
    let columns = rows[i].split(",");
    let obj = {};
    for (let j = 0; j < columns.length; j++) {
      obj[keys[j].toLowerCase()] = columns[j].trim();
    }
    arr.push(obj);
  }
  return arr;
};
