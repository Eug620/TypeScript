// commonjs 导出模块
// 在 ts 中，针对这种模块导出，有多种方式可以导入，第一种方式是 const ... = require：

// 整体导入
// const foo = require('index');
// 单个导入
// const bar = require('index').bar;

// 第二种方式是 import ... from，注意针对整体导出，需要使用 import * as 来导入：

// 整体导入
// import * as foo from 'index';
// 单个导入
// import { bar } from 'index';

// 第三种方式是 import ... require，这也是 ts 官方推荐的方式：

// 整体导入
// import foo = require('index');
// 单个导入
// import bar = foo.bar;
// 对于这种使用 commonjs 规范的库，假如要为它写类型声明文件的话，就需要使用到 export = 这种语法了：

