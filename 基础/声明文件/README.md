# 声明文件

当使用第三方库时,我们需要饮用它的声明文件,才能获得对应的代码不全、接口提示等功能

## 新语法索引

由于本章涉及大量新语法，故在本章开头列出新语法的索引，方便大家在使用这些新语法时能快速查找到对应的讲解：

 - [declare var](declare-var.ts) 声明全局变量
 - [declare function](declare-function.ts)声明全局方法
 - [declare class](declare-class.ts)声明全局类
 - [declare enum](declare-enum.ts)声明全局枚举类型
 - [declare namespace](declare-namespace.ts)声明（含有子属性的）全局对象
 - [interface 和 type](interface-type.ts)声明全局类型
 - [export](export.ts)导出变量
 - [export namespace](export-namespace.ts)导出（含有子属性的）对象
 - [export default](export-default.ts)ES6 默认导出
 - [export =](export=.ts)commonjs 导出模块
 - [export as namespace](export-as-namespace.ts)UMD 库声明全局变量
 - [declare global](declare-global.ts)扩展全局变量
 - [declare module](declare-module.ts)扩展模块
 - [/// <reference \/>](reference.ts)三斜线指令

## 什么是声明语句

假如想使用三方库jquery,常见方式是html中用script标签引入即可,然后就可以全局使用`$`或`jquery`了.

通常获取dom:
```js
$('#foo');
// or
jQuery('#foo');
```
但是ts中,编译器不知道`$`或`jquery`是什么
```js
jQuery('#foo');
// ERROR: Cannot find name 'jQuery'.
```

这时，我们需要使用 `declare var` 来定义它的类型
```ts
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```

上例中，`declare var` 并没有真的定义一个变量，只是定义了全局变量 `jQuery` 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它编译结果是：
```js
jQuery('#foo');
```

除了 `declare var` 之外，还有其他很多种声明语句，将会在后面详细介绍。

## 什么是声明文件

通常我们会把声明语句放到一个单独的文件（`jQuery.d.ts`）中，这就是声明文件
```ts
// src/jQuery.d.ts

declare var jQuery: (selector: string) => any;
```

```ts
// src/index.ts

jQuery('#foo');
```
声明文件必需以 `.d.ts` 为后缀。

一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有` *.ts` 文件就都可以获得 `jQuery` 的类型定义了。
```
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```
假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

这里只演示了全局变量这种模式的声明文件，假如是通过模块导入的方式使用第三方库的话，那么引入声明文件又是另一种方式了，将会在后面详细介绍。

### 第三方声明文件

当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了：[jQuery in DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jquery/index.d.ts)。

我们可以直接下载下来使用，但是更推荐的是使用 `@types` 统一管理第三方库的声明文件。

`@types` 的使用方式很简单，直接用 `npm` 安装对应的声明模块即可，以 `jQuery` 举例：
```node
npm install @types/jquery --save-dev
```
可以在[这个页面](https://microsoft.github.io/TypeSearch/)搜索你需要的声明文件。

## 书写声明文件

当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了。前面只介绍了最简单的声明文件内容，而真正书写一个声明文件并不是一件简单的事，以下会详细介绍如何书写声明文件。

在不同的场景下，声明文件的内容和使用方式会有所区别。

库的使用场景主要有以下几种：
 - 全局变量：通过 `<script>` 标签引入第三方 库，注入全局变量
 - npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
 - UMD 库：既可以通过 `<script> `标签引入，又可以通过 `import` 导入
 - 直接扩展全局变量：通过 `<script>` 标签引入后，改变一个全局变量的结构
 - 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
 - 模块插件：通过 `<script>` 或 `import` 导入后，改变另一个模块的结构

 ### 全局变量

 全局变量是最简单的一种场景，之前举的例子就是通过 `<script>` 标签引入 `jQuery`，注入全局变量 `$` 和 `jQuery`。

使用全局变量的声明文件时，如果是以 `npm install @types/xxx --save-dev `安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 `src` 目录下（或者对应的源码目录下）：
```
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```

如果没有生效，可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

全局变量的声明文件主要有以下几种语法：

 - [declare var](declare-var.ts)声明全局变量
 - [declare function](declare-function.ts)声明全局方法
 - [declare class](declare-class.ts)声明全局类
 - [declare enum](declare-enum.ts)声明全局枚举类型
 - [declare namespace](declare-namespace.ts)声明（含有子属性的）全局对象
 - [interface 和 type](interface-type.ts)声明全局类型