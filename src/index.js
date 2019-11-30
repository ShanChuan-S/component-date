import React from 'react';
import ReactDOM from 'react-dom';

// 引入时间选择组件
import SelectMoreDate from './js/components/select-more-date/select-more-date.js';

ReactDOM.render(
    <SelectMoreDate 
        // choose_one={false} // 默认值为false，也就是可多选
        // date_list={['2019/11/14','2019/11/19']}
        changeCallBack={(res) => {console.log(res)}} // res 就是返回的结果 该项是必填项
    />,
    document.getElementById("app")
);