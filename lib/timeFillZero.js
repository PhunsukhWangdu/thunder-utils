const formatNum = (num) => {
  return (num/100).toFixed(2).toString().split('.')[1];
};

/*const other_formatNum = (num: number) => {
  return
};*/

export default formatNum