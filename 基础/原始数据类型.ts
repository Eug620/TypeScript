/*
 * @Author: yeyuhang
 * @Date: 2020-09-25 11:11:07
 * @LastEditTime: 2020-09-25 11:37:52
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
 */

// boolean
const BOOLEAN = function () {
    let isDone: Boolean = false
    console.log(isDone);
    // 编译通过
    // 后面约定，未强调编译错误的代码片段，默认为编译通过

    // 注意，使用构造函数 Boolean 创造的对象不是布尔值：
    let createdByNewBoolean: boolean = new Boolean(1)
    console.log(ccreatedByNewBooleane);
    // 事实上 new Boolean() 返回的是一个 Boolean 对象：

    // 直接调用 Boolean 也可以返回一个 boolean 类型：
    let createdByBoolean: boolean = Boolean(1)
    console.log(createdByBoolean);
}
BOOLEAN()

// number
const NUMBER = function () {
    let decLiteral: number = 6;
    let hexLiteral: number = 0xf00d;
    // ES6 中的二进制表示法
    let binaryLiteral: number = 0b1010;
    // ES6 中的八进制表示法
    let octalLiteral: number = 0o744;
    let notANumber: number = NaN;
    let infinityNumber: number = Infinity;
}
NUMBER()

// string
const STRING = function () {
    let myName: string = 'Tom';
    console.log(myName);
    let myAge: number = 25;
    console.log(myAge);
    // 模板字符串
    let sentence: string = `Hello, my name is ${myName}.
    I'll be ${myAge + 1} years old next month.`;
    console.log(sentence);
}
STRING()

// 空值
const VOID = function () {
    function alertName(): void {
        alert('my name is tom')
    }
    console.log(alertName());
    
    // 声明一个void 类型只能将它赋值为undefined和null
    let unusable: void = undefined
    console.log(unusable);
}
VOID()

// null 和 undefined
const NULL_UNDEFINED = function () {
    let u: undefined = undefined
    console.log(u);
    
    let n: null = null
    console.log(n);

    // 与void的区别是，它们是所有类型的子类型，可以赋值给任意类型，例：
    let num: number = undefined
    // 或
    let num1: number = u
    // 而void类型变量不能赋值给number类型的变量
    let v: void
    let num2: number = v
    // Type 'void' is not assignable to type 'number'.
    
}
NULL_UNDEFINED()
