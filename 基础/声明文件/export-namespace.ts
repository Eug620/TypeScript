// 导出（含有子属性的）对象
// 与 declare namespace 类似，export namespace 用来导出一个拥有子属性的对象：
import { foo } from 'index';

console.log(foo.name);
foo.bar.baz();