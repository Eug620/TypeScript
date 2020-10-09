// 扩展模块
import * as moment from './foo/declareModule';
import './foo/declareModule';

moment.foo();

// declare module 也可用于在一个文件中一次性声明多个模块的类型：
import { Foo } from 'foo';
import * as bar from 'bar';

let f: Foo;
bar.bar();