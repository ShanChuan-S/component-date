import React, { Component } from 'react';

import { getAllDate } from './moment-fun'; // 获取日期列表方法

import './datetime-list.scss';

class DatetimeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            week_list: ['日', '一', '二', '三', '四', '五', '六'],
            date_list: [],
            props_date_list: [],
            choose_one: false,
            year: '',
            month: '',
            day: ''
        }
    }

    componentDidMount() {
        // 获取当前月份的所有日期数据列表
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let date_list = getAllDate(year, month);
        let props_date_list = this.props.date_list,
            props_choose_one = this.props.choose_one;
        this.activeDate();
        this.setState({
            year,
            month,
            day,
            date_list,
            props_date_list,
            choose_one: props_choose_one
        });
    }

    activeDate = () => {
        let { props_date_list, date_list } = this.state;
        // 判断哪几个日期是已选的(这里的for循环需要优化)
        for(let i = 0; i < props_date_list.length; i++) {
            for(let j = 0; j < date_list.length; j++) {
                for(let k = 0; k < date_list[j].length; k++) {
                    if(props_date_list[i] === date_list[j][k].date) {
                        date_list[j][k].active = true;
                        break;
                    }
                }
            }
        }
    }

    // 点击选择日期
    checkDate = (index, val_index) => {
        if(this.state.choose_one) {
            this.state.date_list.map((item) => {
                item.map((val) => {
                    val.active = false
                })
            })
        }
        this.state.date_list[index][val_index].active = !this.state.date_list[index][val_index].active;
        let resultDate = this.getResultDate();
        this.setState({
            date_list: this.state.date_list
        }, () => {
            this.props.changeCallBack(resultDate);
        });
    }

    // 获取需要返回到上一层的结果
    getResultDate = () => {
        let resultDate = [];
        this.state.date_list.map((item) => {
            item.map((val) => {
                if(val.active) {
                    resultDate.push(val);
                }
            })
        })
        this.setState({
            props_date_list: resultDate
        })
        return resultDate;
    }

    // 点击切换上一月或者下一月
    changeMonth = (type) => {
        let { year, month } = this.state;
        // 切换至上一个月
        if(type === 'prev') {
            if(month === 1) {
                month = 12;
                year -= 1;
            } else {
                month -= 1;
            }
        } else {
            // 切换至下一个月
            if(month === 12) {
                month = 1;
                year += 1;
            } else {
                month += 1;
            }
        }

        let date_list = getAllDate(year, month);

        this.setState({
            year,
            month,
            date_list
        })
    }

    render() {
        return (
            <div className="datetime-list-container"  onClick={(e) => {e.nativeEvent.stopImmediatePropagation()}}>
                {/* 标题显示，同时月份切换 */}
                <div className="date-title">
                    <div className="change-month-btn" onClick={() => this.changeMonth('prev')}>{`<`}</div>
                    {this.state.year}年{this.state.month}月
                    <div className="change-month-btn right-btn" onClick={() => this.changeMonth('next')}>{`>`}</div>
                </div>
                {/* 日期显示列表 */}
                <table className="date-container">
                    <thead>
                        <tr>
                            {
                                this.state.week_list.map((val) => {
                                    return (
                                        <th key={val}>{val}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.date_list.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {
                                            item.map((val, val_index) => {
                                                return (
                                                    <td key={val.date} 
                                                        className={`${val.now_month ? 'now-month' : 'not-now-month'} ${val.active ? 'active' : ''}`}
                                                        onClick={ val.now_month ? () => this.checkDate(index, val_index) : null }>
                                                        {val.day}
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DatetimeList;