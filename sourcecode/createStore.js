//接收三个参数
//reducer为function。当dispatch一个action时，此函数接收action来更新state
//preloadState初始化State
//enhancer 为function。用来增强store, Redux 定义有applyMiddleware来增强store，后面会
//单独讲applyMiddleware

export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
      //如果只传了两个参数，并且第二个参数为函数，第二个参数会被当作enhancer
      enhancer = preloadedState
      preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
      if (typeof enhancer !== 'function') {
          //校验enhancer是否为函数，如果不是函数则抛出异常
          throw new Error('Expected the enhancer to be a function.')
      }
      //如果enhancer存在且为函数，那么则返回如下调用，如果enhancer为applyMiddleware，那么调用则
      //是applyMiddleware(createStore)(reducer, preloadedState)。后面讲applyMiddleware再详细讲。
      return enhancer(createStore)(reducer, preloadedState)
  }

  if (typeof reducer !== 'function') {
      //校验reducer是否为函数
      throw new Error('Expected the reducer to be a function.')
  }

  var currentReducer = reducer
  //得到reducer

  var currentState = preloadedState
  //得到初始init，没有传递则为undefined

  var currentListeners = []
  //定义一个数组用来存放listeners。就是一个函数数组，当state发生改变时，会循环执行这个数组里面的函数

  var nextListeners = currentListeners
  //用来存储下一次的listeners数组。为什么要有这个listeners数组呢？因为当state发生改变时，我们根据
  //上面的currentListeners来循环执行函数，但是在这执行这些函数时，函数内部可能取消或者添加订阅
  //（state改变时，添加或者取消执行函数），这时如果直接操作currentListeners ，相当于在循环
  //内部修改循环条件，执行瞬间就乱套了，有没有啊，有没有

  var isDispatching = false
  //reducer函数是否正在执行的标识

  function ensureCanMutateNextListeners() {
      //拷贝currentListeners一份为nextListeners,这样nextListeners的改变不会引起currentListeners的改变
      //（上面解释过原因啦）
  }

  function dispatch() {
      //触发action去执行reducer，更新state
  }

  function subscribe() {
      //接收一个函数参数，订阅state的改变。当state改变时会执行这个函数
       
  }

  function getState() {
      //获取state树
       
  }

  function replaceReducer() {
      //替换reducer
       
  }

  function observable() {
  }


  dispatch({ type: ActionTypes.INIT })
  //执行dispatch函数，初始化state

  return {
      //真正的返回，执行createStore其实返回的就是这些东东
      dispatch,       //触发action去执行reducer，更新state
      subscribe,     //订阅state改变，state改变时会执行subscribe的参数（自己定义的一个函数）
      getState,      //获取state树
      replaceReducer,       //替换reducer
      [$$observable]: observable  //redux内部用的
  }
}