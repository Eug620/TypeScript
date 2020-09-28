/*
 * @Author: yeyuhang
 * @Date: 2020-09-25 11:40:05
 * @LastEditTime: 2020-09-28 16:27:40
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
 */

// 任意值（Any）用来表示允许赋值为任意类型
// 任意类型：any，则允许被赋值为任意类型
export const DEMO_1 = () => {
    let string2: any = 'hello'
    string2 = 2
    // 普通类型：赋值过程中改变类型是不被允许的
    let string1: string ='hello'
    string1 = 1
    // Type 'number' is not assignable to type 'string'.
}

// 可以访问任意值上的属性与方法
export const DEMO_2 = () => {
    let anyThing: any = 'hello';
    console.log(anyThing.myName);
    console.log(anyThing.myName.firstName);

    // 也允许调用任何方法：
    anyThing.setName('Jerry');
    anyThing.setName('Jerry').sayHello();
    anyThing.myName.setFirstName('Cat');
}
// 声明一个变量为任意值后，对它的任何操作，返回的内容的类型都是任意值

// 未声明类型的变量
// 如果声明变量时没定义其类型，那么它会被识别为任意类型
export const DEMO_3 = () => {
    let something;
    something = 'seven';
    something = 7;

    something.setName('Tom');
}
// 等价于
export const DEMO_4 = () => {
    let something: any;
    something = 'seven';
    something = 7;

    something.setName('Tom');
}

// ！！！慎用
