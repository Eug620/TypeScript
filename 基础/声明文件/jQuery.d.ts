// 一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let。
// 需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现
declare let jQueryLet: (selector: string) => any;
declare const jQueryConst: (selector: string) => any;


// declare function 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义：
declare function jQueryFunction(selector: string): any;
// 在函数类型的声明语句中，函数重载也是支持的：
declare function jQueryFunction(selector: string): any;
declare function jQueryFunction(domReadyCallback: () => any): any;


// 当全局变量是一个类的时候，我们用 declare class 来定义它的类型：
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
// 同样的，declare class 语句也只能用来定义类型，不能用来定义具体的实现，比如定义 sayHi 方法的具体实现则会报错：
declare class AnimalError {
    name: string;
    constructor(name: string);
    sayHi() {
        return `My name is ${this.name}`;
    };
    // ERROR: An implementation cannot be declared in ambient contexts.
}


// 使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums），举例如下
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
// 与其他全局变量的类型声明一致，declare enum 仅用来定义类型，而不是具体的值。


// namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。
declare namespace jQueryNamespace {
    function ajax(url: string, settings?: any): void;
}
// 注意，在 declare namespace 内部，我们直接使用 function ajax 来声明函数，而不是使用 declare function ajax。类似的，也可以使用 const, class, enum 等语句：
declare namespace jQueryNamespaceTest {
    function ajax(url: string, settings?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
}
// 嵌套的命名空间
// 如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型：
declare namespace jQueryNamespaces {
    function ajax(url: string, settings?: any): void;
    namespace fn {
        function extend(object: any): void;
    }
}
// 假如 jQueryNamespaceFn 下仅有 fn 这一个属性（没有 ajax 等其他属性或方法），则可以不需要嵌套 namespace：
declare namespace jQueryNamespaceFn.fn {
    function extend(object: any): void;
}


// 除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 interface 或 type 来声明一个全局的接口或类型：
// type 与 interface 类似。
interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
}
declare namespace jQueryAjaxSettings {
    function ajax(url: string, settings?: AjaxSettings): void;
}
// 防止命名冲突
// 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下：
declare namespace jQueryNoRepeat {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}
// 注意，在使用这个 interface 的时候，也应该加上 jQueryNoRepeat 前缀

// 声明合并
// 假如 jQueryMerge 既是一个函数，可以直接被调用 jQueryMerge('#foo')，又是一个对象，拥有子属性 jQueryMerge.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来：
declare function jQueryMerge(selector: string): any;
declare namespace jQueryMerge {
    function ajax(url: string, settings?: any): void;
}





