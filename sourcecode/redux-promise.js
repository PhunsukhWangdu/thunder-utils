import { isFSA } from 'Flux Standard Action'

//Flux Standard Action的定位是“一个用户友好的Flux action对象标准”

// 典型的Flux Standard Action结构如下：

// {
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Do something.'
//     }
// }

// let isFSA = Object.keys(action).every((item)=>{
//   return  ['payload','type','error','meta'].indexOf(item) >  -1
// })

function isPromise(val) {
  if(val && typeof val.then === 'function') return true;
  return false;
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}