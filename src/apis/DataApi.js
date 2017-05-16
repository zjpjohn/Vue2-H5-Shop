import {getJson, postJsonForDownload} from '../utils/FetchUtil';

export function getActiveStats(params) {
    //params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);
    return getJson('baseStats/actives', params);
}
export function getNewStats(params) {
    return getJson('data/active', params);
}
export function getDistance() {
    return getJson('runData/daily/byDistance');
}
export function getNewActivesStats(params) {
    return getJson('data/userLogin', params);
}

export function exportActiveStats(params, titles) {
    return postJsonForDownload('baseStats/actives/export', {params, titles}, 'Active Stats.xlsx');
}
export function exportNewStats(params, titles) {
    return postJsonForDownload('data/active/export', {params, titles}, 'New Stats.xlsx');
}
export function exportCactiveStats(params, titles) {
    return postJsonForDownload('data/userLogin/export', {params, titles}, 'Actives.xlsx');
}
export function getRegistStats(params) {
    return getJson('baseStats/regists', params);
}

export function exportRegistStats(params, titles) {
    return postJsonForDownload('baseStats/regists/export', {params, titles}, 'Registration Stats.xlsx');
}
