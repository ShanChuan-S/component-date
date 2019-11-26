export function getAllDate(year, month) {
    let params_date = new Date(year, month, 0);
    let day_num = params_date.getDate(); // 获取这个月一共有多少天
    let now_week = new Date(`${year}/${month}/01`).getDay();// 月份开始的第一天是周几
    let day_arr = [];// 返回的当前月份应该显示的数据
    // 如果第一天不是周日，则取上个月份的最后几天进行显示
    if(now_week !== 0) {
        let prev_month = month - 1,
            prev_year = year;
        if(prev_month < 1) {
            prev_month = 12;
            prev_year -= 1;
        }
        let prev_day_num = new Date(prev_year, prev_month, 0).getDate();
        for(let i = 1; i <= now_week; i++){
            day_arr.push({
                day: prev_day_num - now_week + i,
                week_num: i - 1,
                date: `${prev_year}/${prev_month}/${prev_day_num - now_week + i}`,
                now_month: false
            })
        }
    }
    // 获取当前月份的数据
    for(let i = 1; i <= day_num; i++) {
        let week_num = new Date(`${year}/${month}/${i}`).getDay();
        day_arr.push({
            day: i,
            week_num: week_num,
            date: `${year}/${month}/${i}`,
            now_month: true
        })
    }
    // 判断月份数据是否已经足够42份，不够则添加至42个
    let day_arr_length = day_arr.length;
    if(day_arr_length < 42) {
        let next_month = month + 1,
            next_year = year;
        if(next_month > 12) {
            next_month = 1;
            next_year += 1;
        }
        for(let i = 1; i <= 42 - day_arr_length; i++) {
            let week_num = new Date(`${next_year}/${next_month}/${i}`).getDay();
            day_arr.push({
                day: i,
                week_num: week_num,
                date: `${next_year}/${next_month}/${i}`,
                now_month: false
            })
        }
    }
    // 将42个数据每7个做处理，为了dom的显示
    let result_arr = [];
    let result_arr_index = 0;
    for(let i = 0; i < day_arr.length; i++) {
        if(i%7 === 0){
            i !== 0 && result_arr_index++;
            result_arr[result_arr_index] = [];
        }
        result_arr[result_arr_index].push(day_arr[i]);
    }
    return result_arr;
}