/*
 * @Author: yeyuhang
 * @Date: 2020-09-25 10:57:39
 * @LastEditTime: 2020-09-25 11:06:46
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
 */
function sayHello1(person: string) {
    return 'Hello, ' + person;
}

let user1 = 'Tom';
console.log(sayHello1(user1));

// 类型错误不影响编译
// 如果要在报错的时候终止 js 文件的生成，可以在 tsconfig.json 中配置 noEmitOnError 即可。
function sayHello2(person: string) {
    return 'Hello, ' + person;
}

let user2 = [0, 1, 2];
console.log(sayHello2(user2));
