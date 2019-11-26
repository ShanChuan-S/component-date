import React from 'react';
import PropTypes from 'prop-types'; // 后面用来做类型判断

import DatetimeList from './datetime-list'; // 日期下拉列表组件

import './select-more-date.scss';

class SelectMoreDate extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            list_show: true,
            date_list: [],
            date_text: ''
        }
    }

    componentDidMount() {
        document.addEventListener('click', () => {
            this.setState({ list_show: false })
        });
    }

    show = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            list_show: !this.state.list_show
        });
    }

    changeCallBack = (item) => {
        this.setState({
            date_list: item,
            date_text: item.join()
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
                            choose_one={false} // 默认值为false，也就是可多选
                            date_list={this.state.date_list}
                            changeCallBack={this.changeCallBack}
                        />
                    )
                    : ''
                }
            </div>
        );
    }
}

export default SelectMoreDate;