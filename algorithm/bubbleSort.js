// 升序冒泡
// 时间复杂度：平均时间复杂度是O(n^2)
// 空间复杂度：由于辅助空间为常数，所以空间复杂度是O(1)

const bubbleSort = (arr) => {
  const len = arr.length;
  for(let i=0; i<len; i++) {
    let nochange = true;
    for(let j=0; j<len-i-1 ; j++) {
      if(arr[j] > arr[j+1]) {
        _swap(j, j+1, arr);
        //交换时赋值而不是放到else中 因为只要有一次交换就证明当前还不是已排序数组
        nochange = false;
      }
    }
    //如果当前循环无交换 则证明已经排好序
    if(nochange) break;
  }
  return arr;
}

//交换顺序
const _swap = (i, j, arr) => {
  const _temp = arr[i];
  arr[i] = arr[j];
  arr[j] = _temp;
}

//将数组中某元素移动到指定位置
const _move = (list, from, to) => {
  //数组中from的元素移动到to
  //const result = _deepCopy(list);
  const result = list;
  const _fromitem = result[from];
  from > to ? (from = from + 1) : (to = to + 1);
  result.splice(to, 0, _fromitem);
  result.splice(from, 1)
  return result;
}

export default bubbleSort;