import compose from './compose';

//-----调用方式：
// const store = createStore(
//   reducer,
//   initial_state,
//   applyMiddleware(logger)
// );

// 如果只传了两个参数，并且第二个参数为函数，第二个参数会被当作enhancer
// const store = createStore(
//   reducer,
//   applyMiddleware(logger)
// );

//结合createStore源码，实际上createStore内部调用的是 return enhancer(createStore)(reducer, preloadedState)
//let newStore = applyMiddleware(mid1,mid2,mid3)(createStore)(reducer,null)


export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    //每个中间件都获得middlewareAPI
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    //将store.dispatch作为初始参数传入最后一个middleware 再依次传入前面的middleware，所以每个
    //middleware接受到的第一个参数是原始的getState和dispatch，第二个参数是后面的middleware装饰过的dispatch
    //第三个参数是action，也可能是函数

    //middleware层层装饰dispatch
    dispatch = compose(...chain)(store.dispatch);

    //store真正的返回
    // dispatch,       //触发action去执行reducer，更新state
    // subscribe,     //订阅state改变，state改变时会执行subscribe的参数（自己定义的一个函数）
    // getState,      //获取state树
    // replaceReducer,       //替换reducer
    // [$$observable]: observable        

    return {...store, dispatch}

  }

}