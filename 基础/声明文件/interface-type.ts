// 声明全局类型
let settings: AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQueryAjaxSettings.ajax('/api/post_something', settings);

// 防止命名冲突
let settingsNoRepeat: jQueryNoRepeat.AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQueryNoRepeat.ajax('/api/post_something', settingsNoRepeat);

// 声明合并

jQueryMerge('#foo');
jQueryMerge.ajax('/api/get_something');