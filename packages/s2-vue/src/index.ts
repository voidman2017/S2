window.watch = function (obj, propName) {
    // 保存原有属性的值
    let internalValue = obj[propName];

    // 使用 Object.defineProperty 来监视属性的变化
    Object.defineProperty(obj, propName, {
        get() {
            return internalValue;
        },
        set(value) {
            // debugger; // 设置断点
            internalValue = value;
        },
        configurable: true, // 允许以后更改这个属性的定义
        enumerable: true, // 保持属性可枚举
    });
}

import './utils/extendLocale';
export * from './hooks/useExpose';
export * from './components';
