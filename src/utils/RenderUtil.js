import moment from 'moment';

export function renderMissedPropertyError(missedPropertyNames) {
    if (missedPropertyNames == null && missedPropertyNames.length === 0) {
        return null;
    }

    let error = '';
    for (let i = 0; i < missedPropertyNames.length - 1; i++) {
        const name = missedPropertyNames[i];
        error += name + ', ';
    }
    error += missedPropertyNames[missedPropertyNames.length - 1] + ' ';
    error += 'can not be empty!'

    return error;
}

export function renderDatetime(timestamp) {
    const time = moment.unix(timestamp);
    return time.format();
}

export function renderDate(value) {
    const dateFormat = 'YYYY-MM-DD';
    if (value == null) {
        return null;
    }

    return moment(value).format(dateFormat);
}

export function renderDateRange(rangeValue) {
    if (rangeValue == null) {
        return null;
    }

    if (rangeValue[0] == null && rangeValue[1] == null) {
        return null;
    }

    const dateFormat = 'YYYY-MM-DD';

    const start = rangeValue[0] != null ? moment(rangeValue[0]).format(dateFormat) : '';
    const end = rangeValue[1] != null ? moment(rangeValue[1]).format(dateFormat) : '';

    return `${start} ~ ${end}`;
}

export function renderDateRangeStringValue(rangeValue) {
    const start = rangeValue[0] != null ? renderDate(rangeValue[0]) : null;
    const end = rangeValue[1] != null ? renderDate(rangeValue[1]) : null;

    return [start, end];
}

export function coverOptions(options, payload) {
    if (options == null || payload == null) return null;

    for (let item of options){
        if (item.value == payload) {
            return item.text;
        }
    }

    return null;
}