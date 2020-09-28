/*
 * @Author: yeyuhang
 * @Date: 2020-09-28 10:48:09
 * @LastEditTime: 2020-09-28 16:08:40
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
 */
// ts中，数组类型有多种定义方式

/**
 * 「类型+方括号」表示法
 */
// 最简单的方式是用「类型+方括号」来表示数组
export const DEMO_1 = () => {
    let fibonacci: number[] = [1, 1, 2, 3, 5];
}
// 数组中不允许出现其他的类型
export const DEMO_2 = () => {
    let fibonacci: number[] = [1, '1', 2, 3, 5];

    // Type 'string' is not assignable to type 'number'.
}
// 数组的方法也会根据约定类型进行限制
export const DEMO_3 = () => {
    let fibonacci: number[] = [1, 1, 2, 3, 5];
    fibonacci.push('8');

    // Argument of type '"8"' is not assignable to parameter of type 'number'.
}

/**
 * 数组泛型
 */
// 也可以使用数组泛型（Array Generic）「Array<eleType>」来表示数组
export const DEMO_4 = () => {
    let fibonacci: Array<number> = [1, 2, 3, 4, 5];
}

/**
 * 用接口表示数组
 */
// 接口也可以用来描述数组
export const DEMO_5 = () => {
    interface NumberArray {
        [index: number]: number;
    }
    let fibonacci: NumberArray = [1, 2, 3, 4, 5];
}
// NumberArray表示： 只要索引的类型是数字时，其值类型必须是数字
// 虽然接口也可以用来描述数组，但一般不会这么做，因为这种方式比前两种复杂多了
// 有一种情况例外，那就是它常用来表示类数组

/**
 * 类数组
 */
// 类数组（Array-like Object）不是数组类型，比如arguments
export const DEMO_6 = () => {
    function sum() {
        let args: number[] = arguments;
    }
    
    // Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
}
// 上例，arguments实际是一个类数组，不能用普通数组的方式来描述，而应该用接口
export const DEMO_7 = () => {
    function sum() {
        let args: {
            [index: number]: number;
            length: number;
            callee: Function;
        } = arguments;
    }
}
// 在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性。

// 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
export const DEMO_8 = () => {
    function sum() {
        let args: IArguments = arguments;
    }
}

// 其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
export const DEMO_9 = () => {
    interface IArguments {
        [index: number]: any;
        length: number;
        callee: Function;
    }
}

/**
 * any 在数组中的应用
 */
// 一个比较常见的做法是，用 any 表示数组中允许出现任意类型：
export const DEMO_10 = () => {
    let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
}
