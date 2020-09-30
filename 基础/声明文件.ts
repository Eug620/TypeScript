/*
 * @Author: yeyuhang
 * @Date: 2020-09-28 16:29:24
 * @LastEditTime: 2020-09-30 15:07:53
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
 */
/**
 * 声明文件
 * 当使用第三方库时，我们需要饮用它的声明文件，才能获得对应的代码不全，接口提示等功能
 */

//  使用第三方库需要为此声明,例如
// 使用jq时
// $('#foo')
// or
// jqeury('#foo')

// ts并不知道什么是$或者jquery
// 这时就要提前声明并定义其类型
declare var jqeury: (selector: string) => any;
jqeury('$foo')
// declare var并没有真定义一个变量,儿时定义全局变量jquery的类型
// 仅用于编译时检查,编辑结果中会被删除

/**
 * 声明文件
 * 通常将声明语句抽提一个文件,就是声明文件(jquery.d.ts)
 * 声明文件必须以 .d.ts 为后缀
 */
// 一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了。

// /path/to/project
// ├── src
// |  ├── index.ts
// |  └── jQuery.d.ts
// └── tsconfig.json

// 假如仍然无法解析，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。

// 这里只演示了全局变量这种模式的声明文件，假如是通过模块导入的方式使用第三方库的话，那么引入声明文件又是另一种方式了，将会在后面详细介绍。

/**
 * 第三方声明文件
 * 推荐的使用 @types 统一管理第三方库的声明文件。
 * @types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：
 * npm install @types/jquery --save-dev
 * 可以在这个页面搜索你需要的声明文件。
 * https://microsoft.github.io/TypeSearch/
 */

 /**
  * 书写声明文件
  */
//  当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了。前面只介绍了最简单的声明文件内容，而真正书写一个声明文件并不是一件简单的事，以下会详细介绍如何书写声明文件。

// 在不同的场景下，声明文件的内容和使用方式会有所区别。

// 库的使用场景主要有以下几种：

// 1.全局变量：通过 <script> 标签引入第三方库，注入全局变量
// 2.npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
// 3.UMD 库：既可以通过 <script> 标签引入，又可以通过 import 导入
// 4.直接扩展全局变量：通过 <script> 标签引入后，改变一个全局变量的结构
// 5.在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
// 6.模块插件：通过 <script> 或 import 导入后，改变另一个模块的结构

// 全局变量
// 全局变量是最简单的一种场景，之前举的例子就是通过 <script> 标签引入 jQuery，注入全局变量 $ 和 jQuery。
// 使用全局变量的声明文件时，如果是以 npm install @types/xxx --save-dev 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）：

// /path/to/project
// ├── src
// |  ├── index.ts
// |  └── jQuery.d.ts
// └── tsconfig.json

// 如果没有生效，可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。

// 全局变量的声明文件主要有以下几种语法：

// - declare var 声明全局变量
// - declare function 声明全局方法
// - declare class 声明全局类
// - declare enum 声明全局枚举类型
// - declare namespace 声明（含有子属性的）全局对象
// - interface 和 type 声明全局类型

// declare var
// 在所有的声明语句中，declare var 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。与其类似的，还有 declare let 和 declare const，使用 let 与使用 var 没有什么区别：
// src/jQuery.d.ts
declare let jQuery: (selector: string) => any;
// src/index.ts
jQuery('#foo');
// 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
jQuery = function(selector) {
    return document.querySelector(selector);
};
// 而当我们使用 const 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了4：
// 一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let。
// 需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现

// declare function
// declare function 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义：
// src/jQuery.d.ts
declare function jQuery(selector: string): any;
// src/index.ts
jQuery('#foo');
// 在函数类型的声明语句中，函数重载也是支持的6：
// src/jQuery.d.ts
declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;
// src/index.ts
jQuery('#foo');
jQuery(function() {
    alert('Dom Ready!');
});

// declare class