// 声明全局枚举类型
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// jQuery.d.ts 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。它编译结果是：

// var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// 其中 Directions 是由第三方库定义好的全局变量。
