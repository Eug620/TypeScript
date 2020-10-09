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

### npm 包
一般我们通过 `import foo from 'foo'` 导入一个 `npm` 包，这是符合 `ES6` 模块规范的。

在我们尝试给一个 `npm` 包创建声明文件之前，需要先看看它的声明文件是否已经存在。一般来说，npm 包的声明文件可能存在于两个地方：

 - 与该 `npm` 包绑定在一起。判断依据是 `package.json` 中有 `types` 字段，或者有一个 `index.d.ts` 声明文件。这种模式不需要额外安装其他包，是最为推荐的，所以以后我们自己创建 `npm` 包的时候，最好也将声明文件与 `npm` 包绑定在一起。
 - 发布到 `@types` 里。我们只需要尝试安装一下对应的 `@types` 包就知道是否存在该声明文件，安装命令是 `npm install @types/foo --save-dev`。这种模式一般是由于 `npm` 包的维护者没有提供声明文件，所以只能由其他人将声明文件发布到 `@types` 里了。
假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。由于是通过 `import` 语句导入的模块，所以声明文件存放的位置也有所约束，一般有两种方案：

 - 创建一个 `node_modules/@types/foo/index.d.ts` 文件，存放 `foo` 模块的声明文件。这种方式不需要额外的配置，但是 `node_modules` 目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。
 - 创建一个 `types` 目录，专门用来管理自己写的声明文件，将 `foo` 的声明文件放到 `types/foo/index.d.ts` 中。这种方式需要配置下 `tsconfig.json` 中的 `paths` 和 `baseUrl` 字段。
目录结构：
```
/path/to/project
├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json
```
tsconfig.json 内容：
```
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
```
如此配置之后，通过 `import` 导入 `foo` 的时候，也会去 `types` 目录下寻找对应的模块的声明文件了。

注意 `module` 配置可以有很多种选项，不同的选项会影响模块的导入导出模式。这里我们使用了 `commonjs` 这个最常用的选项，后面的教程也都默认使用的这个选项。

不管采用了以上两种方式中的哪一种，我都强烈建议大家将书写好的声明文件（通过给第三方库发 `pull request`，或者直接提交到 `@types` 里）发布到开源社区中，享受了这么多社区的优秀的资源，就应该在力所能及的时候给出一些回馈。只有所有人都参与进来，才能让 `ts` 社区更加繁荣。

npm 包的声明文件主要有以下几种语法：
 - [export](export.ts) 导出变量
 - [export namespace](export-namespace.ts) 导出（含有子属性的）对象
 - [export default](export-default.ts) ES6 默认导出
 - [export =](export=.ts) commonjs 导出模块

### UMD 库
既可以通过 `<script>` 标签引入，又可以通过 `import` 导入的库，称为 `UMD` 库。相比于 `npm` 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts 提供了一个新语法 `export as namespace`。

### 直接扩展全局变量
有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 `ts` 编译错误，此时就需要扩展全局变量的类型。比如扩展 `String` 类型：
```js
interface String {
    prependHello(): string;
}

'foo'.prependHello();
```
通过声明合并，使用 `interface String` 即可给 `String` 添加属性或方法。

也可以使用 `declare namespace` 给已有的命名空间添加类型声明：
```js
// types/jquery-plugin/index.d.ts

declare namespace JQuery {
    interface CustomOptions {
        bar: string;
    }
}

interface JQueryStatic {
    foo(options: JQuery.CustomOptions): string;
}
```
```js
// src/index.ts

jQuery.foo({
    bar: ''
});
```

### 在 `npm` 包或 `UMD` 库中扩展全局变量
如之前所说，对于一个 `npm` 包或者 `UMD` 库的声明文件，只有 `export` 导出的类型声明才能被导入。所以对于 `npm` 包或 `UMD` 库，如果导入此库之后会扩展全局变量，则需要使用另一种语法在声明文件中扩展全局变量的类型，那就是 [declare global](declare-global.ts)。

### 模块插件
有时通过 `import` 导入一个模块插件，可以改变另一个原有模块的结构。此时如果原有模块已经有了类型声明文件，而插件模块没有类型声明文件，就会导致类型不完整，缺少插件部分的类型。ts 提供了一个语法 [declare module](declare-module.ts)，它可以用来扩展原有模块的类型。

### 声明文件中的依赖
一个声明文件有时会依赖另一个声明文件中的类型，比如在前面的 `declare module` 的例子中，我们就在声明文件中导入了 `moment`，并且使用了 `moment.CalendarKey` 这个类型：
```js
// types/moment-plugin/index.d.ts

import * as moment from 'moment';

declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
```
除了可以在声明文件中通过 `import` 导入另一个声明文件中的类型之外，还有一个语法也可以用来导入另一个声明文件，那就是三斜线指令。

### 三斜线指令
与 `namespace` 类似，三斜线指令也是 `ts` 在早期版本中为了描述模块之间的依赖关系而创造的语法。随着 `ES6` 的广泛应用，现在已经不建议再使用 `ts` 中的三斜线指令来声明模块之间的依赖关系了。

但是在声明文件中，它还是有一定的用武之地。

类似于声明文件中的 `import`，它可以用来导入另一个声明文件。与 `import` 的区别是，当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 `import：`

 - 当我们在书写一个全局变量的声明文件时
 - 当我们需要依赖一个全局变量的声明文件时
### 书写一个全局变量的声明文件
这些场景听上去很拗口，但实际上很好理解——在全局变量的声明文件中，是不允许出现 `import`, `export` 关键字的。一旦出现了，那么他就会被视为一个 `npm` 包或 `UMD` 库，就不再是全局变量的声明文件了。故当我们在书写一个全局变量的声明文件时，如果需要引用另一个库的类型，那么就必须用三斜线指令了：
```js
// types/jquery-plugin/index.d.ts

/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string;
```
```js
// src/index.ts

foo({});
```
三斜线指令的语法如上，`///` 后面使用 `xml` 的格式添加了对 `jquery` 类型的依赖，这样就可以在声明文件中使用 `JQuery.AjaxSettings` 类型了。

注意，三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释。

### 依赖一个全局变量的声明文件
在另一个场景下，当我们需要依赖一个全局变量的声明文件时，由于全局变量不支持通过 `import` 导入，当然也就必须使用三斜线指令来引入了：
```js
// types/node-plugin/index.d.ts

/// <reference types="node" />

export function foo(p: NodeJS.Process): string;
```
```js
// src/index.ts

import { foo } from 'node-plugin';

foo(global.process);
```
在上面的例子中，我们通过三斜线指引入了 `node` 的类型，然后在声明文件中使用了 `NodeJS.Process` 这个类型。最后在使用到 `foo` 的时候，传入了 `node` 中的全局变量 `process`。
由于引入的 `node` 中的类型都是全局变量的类型，它们是没有办法通过 `import` 来导入的，所以这种场景下也只能通过三斜线指令来引入了。

以上两种使用场景下，都是由于需要书写或需要依赖全局变量的声明文件，所以必须使用三斜线指令。在其他的一些不是必要使用三斜线指令的情况下，就都需要使用 `import` 来导入。

### 拆分声明文件
当我们的全局变量的声明文件太大时，可以通过拆分为多个文件，然后在一个入口文件中将它们一一引入，来提高代码的可维护性。比如 `jQuery` 的声明文件就是这样的：
```js
// node_modules/@types/jquery/index.d.ts

/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery;
```
其中用到了 `types` 和 `path` 两种不同的指令。它们的区别是：`types` 用于声明对另一个库的依赖，而 `path` 用于声明对另一个文件的依赖。

上例中，`sizzle` 是与 `jquery` 平行的另一个库，所以需要使用 `types="sizzle"` 来声明对它的依赖。而其他的三斜线指令就是将 `jquery` 的声明拆分到不同的文件中了，然后在这个入口文件中使用 `path="foo"` 将它们一一引入。
### 其他三斜线指令
除了这两种三斜线指令之外，还有其他的三斜线指令，比如 `/// <reference no-default-lib="true"/>`, `/// <amd-module />` 等，但它们都是废弃的语法，故这里就不介绍了，详情可见官网。

### 自动生成声明文件
如果库的源码本身就是由 `ts` 写的，那么在使用 `tsc` 脚本将 `ts` 编译为 `js` 的时候，添加 `declaration` 选项，就可以同时也生成 `.d.ts` 声明文件了。

我们可以在命令行中添加 `--declaration`（简写 -d），或者在 `tsconfig.json` 中添加 `declaration` 选项。这里以 `tsconfig.json` 为例：
```js
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib",
        "declaration": true,
    }
}
```
上例中我们添加了 `outDir` 选项，将 ts 文件的编译结果输出到 `lib` 目录下，然后添加了 `declaration` 选项，设置为 `true`，表示将会由 `ts` 文件自动生成 `.d.ts` 声明文件，也会输出到 `lib` 目录下。

运行 `tsc` 之后，目录结构如下：
```
/path/to/project
├── lib
|  ├── bar
|  |  ├── index.d.ts
|  |  └── index.js
|  ├── index.d.ts
|  └── index.js
├── src
|  ├── bar
|  |  └── index.ts
|  └── index.ts
├── package.json
└── tsconfig.json
```
在这个例子中，`src` 目录下有两个 `ts` 文件，分别是 `src/index.ts` 和 `src/bar/index.ts`，它们被编译到 `lib` 目录下的同时，也会生成对应的两个声明文件 `lib/index.d.ts` 和 `lib/bar/index.d.ts`。它们的内容分别是：
```js
// src/index.ts

export * from './bar';

export default function foo() {
    return 'foo';
}
```
```js
// src/bar/index.ts

export function bar() {
    return 'bar';
}
```
```js
// lib/index.d.ts

export * from './bar';
export default function foo(): string;
```
```js
// lib/bar/index.d.ts

export declare function bar(): string;

```
可见，自动生成的声明文件基本保持了源码的结构，而将具体实现去掉了，生成了对应的类型声明。

使用 `tsc` 自动生成声明文件时，每个 ts 文件都会对应一个 `.d.ts` 声明文件。这样的好处是，使用方不仅可以在使用 `import foo from 'foo'` 导入默认的模块时获得类型提示，还可以在使用 `import bar from 'foo/lib/bar'` 导入一个子模块时，也获得对应的类型提示。

除了 declaration 选项之外，还有几个选项也与自动生成声明文件有关，这里只简单列举出来，不做详细演示了：

 - `declarationDir` 设置生成 .`d.ts` 文件的目录
 - `declarationMap` 对每个 `.d.ts` 文件，都生成对应的 `.d.ts.map`（sourcemap）文件
 - `emitDeclarationOnly` 仅生成 `.d.ts 文件`，不生成 `.js` 文件

## 发布声明文件
当我们为一个库写好了声明文件之后，下一步就是将它发布出去了。

此时有两种方案：

 - 将声明文件和源码放在一起
 - 将声明文件发布到 `@types` 下
这两种方案中优先选择第一种方案。保持声明文件与源码在一起，使用时就不需要额外增加单独的声明文件库的依赖了，而且也能保证声明文件的版本与源码的版本保持一致。

仅当我们在给别人的仓库添加类型声明文件，但原作者不愿意合并 `pull request` 时，才需要使用第二种方案，将声明文件发布到 `@types` 下。

### 将声明文件和源码放在一起
如果声明文件是通过 `tsc` 自动生成的，那么无需做任何其他配置，只需要把编译好的文件也发布到 `npm` 上，使用方就可以获取到类型提示了。

如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别：

 - 给 `package.json` 中的 `types` 或 `typings` 字段指定一个类型声明文件地址
 - 在项目根目录下，编写一个 `index.d.ts` 文件
 - 针对入口文件（`package.json` 中的 `main` 字段指定的入口文件），编写一个同名不同后缀的 `.d.ts` 文件
第一种方式是给 `package.json` 中的 `types` 或 `typings` 字段指定一个类型声明文件地址。比如：
```js
{
    "name": "foo",
    "version": "1.0.0",
    "main": "lib/index.js",
    "types": "foo.d.ts",
}
```
指定了 `types` 为 `foo.d.ts` 之后，导入此库的时候，就会去找 `foo.d.ts` 作为此库的类型声明文件了。

`typings` 与 `types` 一样，只是另一种写法。

如果没有指定 `types` 或 `typings`，那么就会在根目录下寻找 `index.d.ts` 文件，将它视为此库的类型声明文件。

如果没有找到 `index.d.ts` 文件，那么就会寻找入口文件（`package.json` 中的 `main` 字段指定的入口文件）是否存在对应同名不同后缀的 `.d.ts` 文件。

比如 `package.json` 是这样时：
```js
{
    "name": "foo",
    "version": "1.0.0",
    "main": "lib/index.js"
}
```
就会先识别 `package.json` 中是否存在 `types` 或 `typings` 字段。发现不存在，那么就会寻找是否存在 `index.d.ts` 文件。如果还是不存在，那么就会寻找是否存在 `lib/index.d.ts` 文件。假如说连 `lib/index.d.ts` 都不存在的话，就会被认为是一个没有提供类型声明文件的库了。

有的库为了支持导入子模块，比如 `import bar from 'foo/lib/bar'`，就需要额外再编写一个类型声明文件 `lib/bar.d.ts` 或者 `lib/bar/index.d.ts`，这与自动生成声明文件类似，一个库中同时包含了多个类型声明文件。