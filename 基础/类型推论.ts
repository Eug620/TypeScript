/*
 * @Author: yeyuhang
 * @Date: 2020-09-27 11:40:35
 * @LastEditTime: 2020-09-28 16:24:12
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
 */
// 如果没有明确指定类型，那么ts会依照推论的规则推断出一个类型（Type Inference）

// 声明时有赋值操作，就会给其制定相应类型，
export const DEMO_1 = () => {
    let myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;

    // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
}
// 等价于
export const DEMO_2 = () => {
    let myFavoriteNumber: string = 'seven';
    myFavoriteNumber = 7;

    // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
}

// 声明时没有赋值操作，不管以后有没有赋值，都会被推断成any类型而完全不被类型检查
export const DEMO_3 = () => {
    let myFavoriteNumber;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
}