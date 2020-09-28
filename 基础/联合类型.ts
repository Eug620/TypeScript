/*
 * @Author: yeyuhang
 * @Date: 2020-09-27 12:02:25
 * @LastEditTime: 2020-09-28 16:21:49
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
 */
// 联合类型（Union Type）表示取值可以为多种类型中的一种，例
export const DEMO_1 = () => {
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
}
export const DEMO_2 = () => {
    let myFavoriteNumber: string | number;
    myFavoriteNumber = true;

    // index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
    //   Type 'boolean' is not assignable to type 'number'.
}
// 联合类型使用｜分隔每个类型
// 上面string｜number含义： 允许类型是string或者number，但是不能是其他类型

// 访问联合类型的属性或方法
// 当ts不确定一个联合类型的变量到底是那个类型的时候，我们只能访问此联合类型当所有类型里共有的属性或方法
export const DEMO_3 = () => {
    function getLength(something: string | number): number {
        return something.length;
    }
    
    // index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
    //   Property 'length' does not exist on type 'number'.
}
// 上面由于length不是string和number的共有属性，所以报错
// 访问共有属性是没问题的
export const DEMO_4 = () => {
    function getString(something: string | number): string {
        return something.toString();
    }
}
// 联合类型在被赋值的时候会根据类型推论推断出一个类型
export const DEMO_5 = () => {
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    console.log(myFavoriteNumber.length); // 5
    myFavoriteNumber = 7;
    console.log(myFavoriteNumber.length); // 编译时报错

    // index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
}

