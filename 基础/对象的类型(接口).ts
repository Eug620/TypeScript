/*
 * @Author: yeyuhang
 * @Date: 2020-09-27 12:28:04
 * @LastEditTime: 2020-09-28 16:18:13
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
 */
// ts中，使用接口（Interfaces）来定义对象的类型

/**
 * 接口
 */
// 在面向对象的语言中，接口（Interface）是一个非常重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
// ts中接口是一个非常灵活对概念，出了可用于对类对一部分行为进行抽象以外，也常用语对 对象的形状（shapge） 进行描述
// 例如
export const DEMO_1 = () => {
    interface Person {
        name: string;
        age: number;
    }
    let tom: Person = {
        name: 'Person',
        age: 25
    }
}
// 上例，定义接口Person。接着定义一个变量Tom，它的类型是Person
// 这样，就约束了tom的形状必须和接口Person一致
// 接口一般首字母答谢，定义的变量比接口少/多了一些属性是不允许的
export const DEMO_2 = () => {
    interface Person {
        name: string;
        age: number;
    }
    // 少属性
    let tom1: Person = {
        name: 'Tom'
    };
    
    // index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
    //   Property 'age' is missing in type '{ name: string; }'.
    
    // 多属性
    let tom2: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };
    
    // index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
    //   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
}
// 可见，赋值的时候，变量的形状必须和接口的形状保持一致

/**
 * 可选属性
 */
// 有时我们希望不要完全匹配一个形状，那么可以用可选属性
export const DEMO_3 = () => {
    interface Person {
        name: string;
        age?: number;
    }

    let tom1: Person = {
        name: 'Tom'
    };

    let tom2: Person = {
        name: 'Tom',
        age: 25
    };
}
// 可选属性的含义是该属性可以不存在
// 这时仍然不允许添加未定义的属性
export const DEMO_4 = () => {
    interface Person {
        name: string;
        age?: number;
    }
    
    let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };
    
    // examples/playground/index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
    //   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
}

 /**
  * 任意属性
  */
 // 有时候我们希望一个接口允许有任意的属性，可以使用如下方式
 export const DEMO_5 = () => {
    interface Person {
        name: string;
        age?: number;
        [propName: string]: any;
    }
    
    let tom: Person = {
        name: 'Tom',
        gender: 'male'
    };
 }
// 使用[propName: string]定义了任意属性取string类型的值
//  需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是他的类型的子集
export const DEMO_6 = () => {
    interface Person {
        name: string;
        age?: number;
        [propName: string]: string;
    }
    
    let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };
    
    // index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
    // index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
    //   Index signatures are incompatible.
    //     Type 'string | number' is not assignable to type 'string'.
    //       Type 'number' is not assignable to type 'string'.
}
// 上例，任意属性的值允许是string，但是可选属性age的值确是number
// number不是string的子属性，所以报错
// 另外，在报错信息中可以看出，此时 { name: 'Tom', age: 25, gender: 'male' } 的类型被推断成了 { [x: string]: string | number; name: string; age: number; gender: string; }，这是联合类型和接口的结合

// 一个接口中只能定义一个任意属性，如果由多个类型的属性，则可以在任意属性中使用联合类型
export const DEMO_7 = () => {
    interface Person {
        name: string;
        age?: number;
        [propName: string]: string | number;
    }
    
    let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };
}
/**
 * 只读属性
 */
// 希望对象中的一些字段只能在创建的时候被赋值，那么可以用readonly定义只读属性
export const DEMO_8 = () => {
    interface Person {
        readonly id: number;
        name: string;
        age?: number;
        [propName: string]: any;
    }
    
    let tom: Person = {
        id: 89757,
        name: 'Tom',
        gender: 'male'
    };
    
    tom.id = 9527;
    
    // index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
}
// 由于使用readonly定义了属性id初始化后，又被赋值了，所以报错

// 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
export const DEMO_9 = () => {
    interface Person {
        readonly id: number;
        name: string;
        age?: number;
        [propName: string]: any;
    }
    
    let tom: Person = {
        name: 'Tom',
        gender: 'male'
    };
    
    tom.id = 89757;
    
    // index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
    //   Property 'id' is missing in type '{ name: string; gender: string; }'.
    // index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
}
// 第一处error： 未给id赋值
// 第二处error： id只读，不可赋值