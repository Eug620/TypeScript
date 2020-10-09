// export 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现：
export const name: string;
export function getName(): string;
export class Animal {
    constructor(name: string);
    sayHi(): string;
}
export enum Directions {
    Up,
    Down,
    Left,
    Right
}
export interface Options {
    data: any;
}

// 混用 declare 和 export
// 我们也可以使用 declare 先声明多个变量，最后再用 export 一次性导出。上例的声明文件可以等价的改写为
declare const nameDeclare: string;
declare function getNameDeclare(): string;
declare class AnimalDeclare {
    constructor(name: string);
    sayHi(): string;
}
declare enum DirectionsDeclare {
    Up,
    Down,
    Left,
    Right
}
interface OptionsDeclare { // **
    data: any;
}
export { nameDeclare, getNameDeclare, AnimalDeclare, DirectionsDeclare, OptionsDeclare };
// 注意，与全局变量的声明文件类似，interface 前是不需要 declare 的。


// 与 declare namespace 类似，export namespace 用来导出一个拥有子属性的对象：
export namespace foo {
    const name: string;
    namespace bar {
        function baz(): string;
    }
}


// 在类型声明文件中，export default 用来导出默认值的类型：
export default function foo(): string;
// 注意，只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出19：
export default enum Directions {
    // ERROR: Expression expected.
    Up,
    Down,
    Left,
    Right
}
// 上例中 export default enum 是错误的语法，需要使用 declare enum 定义出来，然后使用 export default 导出：
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

export default Directions;
// 针对这种默认导出，我们一般会将导出语句放在整个声明文件的最前面：
export default Directions;
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}


// 在 commonjs 规范中，我们用以下方式来导出一个模块：
// 整体导出
module.exports = foo;
// 单个导出
exports.bar = bar;

// 对于这种使用 commonjs 规范的库，假如要为它写类型声明文件的话，就需要使用到 export = 这种语法了：
export = foo;
declare function foo(): string;
declare namespace foo {
    const bar: number;
}
// 需要注意的是，上例中使用了 export = 之后，就不能再单个导出 export { bar } 了。所以我们通过声明合并，使用 declare namespace foo 来将 bar 合并到 foo 里。
// 准确地讲，export = 不仅可以用在声明文件中，也可以用在普通的 ts 文件中。实际上，import ... require 和 export = 都是 ts 为了兼容 AMD 规范和 commonjs 规范而创立的新语法，由于并不常用也不推荐使用，所以这里就不详细介绍了，感兴趣的可以看官方文档。
// 由于很多第三方库是 commonjs 规范的，所以声明文件也就不得不用到 export = 这种语法了。但是还是需要再强调下，相比与 export =，我们更推荐使用 ES6 标准的 export default 和 export。


// 一般使用 export as namespace 时，都是先有了 npm 包的声明文件，再基于它添加一条 export as namespace 语句，即可将声明好的一个变量声明为全局变量，举例如下：
export as namespace foo;
export = foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}
// 当然它也可以与 export default 一起使用：
export as namespace foo;
export default foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}
