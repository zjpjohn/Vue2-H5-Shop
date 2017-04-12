import moment from 'moment';
/**
 * 渲染时间戳
 */
export function renderDatetime(timestamp) {
    //console.log(timestamp);
    //console.log(moment(moment.unix(timestamp)).format("llll"));
    return moment(moment.unix(timestamp)).format("ll");
}

export function renderDateTime(timestamp) {
    //console.log(timestamp);
    //console.log(moment(moment.unix(timestamp)).format("llll"));
    return moment(moment.unix(timestamp)).format("llll");
}


 