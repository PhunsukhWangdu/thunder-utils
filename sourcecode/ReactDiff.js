const _updateChildren =  function(nextNestedChildrenElements, transaction, context) {
  var prevChildren = this._renderedChildren;
  var nextChildren = this._reconcilerUpdateChildren(
    prevChildren, nextNestedChildrenElements, transaction, context
  );
  if (!nextChildren && !prevChildren) {
    return;
  }
  var name;
  var lastIndex = 0;
  var nextIndex = 0;
  // 遍历新的节点集合

  //-----------------------------------------name到底是什么？？？？？？？

  for (name in nextChildren) {
    //for in 会遍历到原型上的属性 所以要用hasownpropperty过一下
    if (!nextChildren.hasOwnProperty(name)) {
      continue;
    }
    //老集合
    var prevChild = prevChildren && prevChildren[name];
    var nextChild = nextChildren[name];
    if (prevChild === nextChild) {
      // 移动节点
      this.moveChild(prevChild, nextIndex, lastIndex);
      //当前节点在老集合中的位置prevChild._mountIndex
      //lastIndex 一直在更新，表示老集合中有的新集合中当前访问过的节点，在老集合中最右的位置，即最大的位置
      //如果当前节点在老集合中比到现在新集合中遍历过的节点在老集合中出现过的最大的位置还要大，说明当前节点在老集合中
      //也是比上一个在老集合中出现的新集合中的节点要靠后，则这个节点不会影响已经遍历过的节点的位置，有点像是插入排序
      lastIndex = Math.max(prevChild._mountIndex, lastIndex);
      //prevChild应该是一直对应着老集合，当前新集合会变成下次一更新时的老集合，所以要把这个老集合中这次新集合中有的节点的
      //下标改成当前新的集合中对应的下标
      prevChild._mountIndex = nextIndex;
    } else {
      //节点结构发生变化，要删除老的，如果不是发生变化那就是新创建了一个节点
      if (prevChild) {
        //变化了的节点在老集合中出现的位置和当前遍历到的在老集合中出现过的新节点在老集合中的最大的下标
        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
        // 删除节点
        this._unmountChild(prevChild);
      }
      // 新创建的节点 初始化并创建节点
      this._mountChildAtIndex(
        nextChild, nextIndex, transaction, context
      );
    }
    nextIndex++;
  }
  for (name in prevChildren) {
    if (prevChildren.hasOwnProperty(name) &&
        !(nextChildren && nextChildren.hasOwnProperty(name))) {
      this._unmountChild(prevChildren[name]);
    }
  }
  this._renderedChildren = nextChildren;
},
// 移动节点
const moveChild = function(child, toIndex, lastIndex) {
  //只有当在老集合中出现过的节点的下标比当前遍历到的最大老集合出现过的下标小的时候才移动，大的本来就在后面可以不移动，借鉴插入排序，比当前遍历到的最大的还大就不动
  if (child._mountIndex < lastIndex) {
    this.prepareToManageChildren();
    enqueueMove(this, child._mountIndex, toIndex);
  }
},
// 创建节点
const createChild = function(child, mountImage) {
  this.prepareToManageChildren();
  enqueueInsertMarkup(this, mountImage, child._mountIndex);
},
// 删除节点
const removeChild = function(child) {
  this.prepareToManageChildren();
  enqueueRemove(this, child._mountIndex);
},

const _unmountChild = function(child) {
  this.removeChild(child);
  child._mountIndex = null;
},

const _mountChildAtIndex = function(
  child,
  index,
  transaction,
  context) {
  var mountImage = ReactReconciler.mountComponent(
    child,
    transaction,
    this,
    this._nativeContainerInfo,
    context
  );
  child._mountIndex = index;
  this.createChild(child, mountImage);
},