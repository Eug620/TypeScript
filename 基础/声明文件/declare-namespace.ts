// 声明(含有子属性的)全局对象
// namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。
// 由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 module 关键字表示内部模块。但由于后来 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module，更名为命名空间。
// 随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案了，故我们不再需要学习 namespace 的使用了。
// namespace 被淘汰了，但是在声明文件中，declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。
// 比如 jQuery 是一个全局变量，它是一个对象，提供了一个 jQuery.ajax 方法可以调用，那么我们就应该使用 declare namespace jQuery 来声明这个拥有多个子属性的全局变量。
jQueryNamespace.ajax('/api/get_something');

// 使用 const, class, enum 等语句
jQueryNamespaceTest.ajax('/api/get_something');
console.log(jQueryNamespaceTest.version);
const e = new jQueryNamespaceTest.Event();
e.blur(jQueryNamespaceTest.EventType.CustomClick);

// 嵌套的namespace
jQueryNamespaces.ajax('/api/get_something');
jQueryNamespaces.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    }
});

// 仅有fn的namespace
jQueryNamespaceFn.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    }
});
