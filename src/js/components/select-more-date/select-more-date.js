import React from 'react';
import propTypes from 'prop-types'; // 后面用来做类型判断

import DatetimeList from './datetime-list'; // 日期下拉列表组件

import './select-more-date.scss';

class SelectMoreDate extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            list_show: false,
            choose_one: false,
            date_list: [],
            date_text: ''
        }
    }

    componentDidMount() {
        // 点击页面其他位置关闭日期下拉框
        document.addEventListener('click', () => {
            this.setState({ list_show: false })
        });

        const { choose_one, date_list } = this.props;
        this.setState({
            choose_one,
            date_list,
            date_text: date_list.join()
        })
    }

    show = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            list_show: !this.state.list_show
        });
    }

    selectCallBack = (item) => {
        this.setState({
            date_list: item,
            date_text: item.join()
        }, () => {
            this.props.changeCallBack(item);
        });
    }

    render() {
        return(
            <div className="select-container">
                <input 
                    className="datetime-input"
                    onClick={this.show}
                    readOnly
                    placeholder="点击选择时间"
                    value={this.state.date_text}
                    title={this.state.date_text}
                />
                {
                    this.state.list_show ?
                    (
                        <DatetimeList
                            choose_one={this.state.choose_one} // 默认值为false，也就是可多选
                            date_list={this.state.date_list}
                            selectCallBack={this.selectCallBack}
                        />
                    )
                    : ''
                }
            </div>
        );
    }
}

// 默认参数
SelectMoreDate.defaultProps = {
    choose_one: false, // 默认值为false，也就是可多选
    date_list: []
}

// 判断类型
SelectMoreDate.propTypes = {
    choose_one: propTypes.bool, // 默认值为false，也就是可多选
    date_list: propTypes.array,
    changeCallBack: propTypes.func.isRequired
}

export default SelectMoreDate;