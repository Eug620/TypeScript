// 声明全局变量
// 在所有的声明语句中，declare var 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。与其类似的，还有 declare let 和 declare const，使用 let 与使用 var 没有什么区别：

jQueryLet('#foo');
// 使用declare let 定义的jQuery类型,允许修改这个全局变量
jQueryLet = function(selector) {
  return document.querySelector(selector)
}

// 而当我们使用 const 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了：
jQueryConst('#foo');
// 使用 declare const 定义的 jQuery 类型，禁止修改这个全局变量
jQueryConst = function(selector) {
    return document.querySelector(selector)
}
// error: Cannot assign to 'jQueryConst' because it is a constant.ts(2588)
