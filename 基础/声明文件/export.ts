// 导出变量
// npm 包的声明文件与全局变量的声明文件有很大区别。在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明。
// export 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现
// 对应的导入和使用模块应该是这样：
import { name, getName, Animal, Directions, Options } from 'index';
import { nameDeclare, getNameDeclare, AnimalDeclare, DirectionsDeclare, OptionsDeclare } from 'index';

console.log(name);
let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
    data: {
        name: 'foo'
    }
};

console.log(nameDeclare, getNameDeclare, AnimalDeclare, DirectionsDeclare );

