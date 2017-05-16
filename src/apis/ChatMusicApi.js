import {getJson, postJson, postForm, postJsonForDownload} from '../utils/FetchUtil';

export function getMusicGenreList(param) {
    return getJson('musicChat/musics/genres', param);
}

export function getMusicGenreByKey(key) {
    return getJson('musicChat/musics/genres', {id: key}).then(res => res.data[0]);
}

export function addMusicGenre(fieldValues) {
    return postForm('musicChat/musics/genres', fieldValues);
}

export function modifyMusicGenre(id, fieldValues) {
    return postForm('musicChat/musics/genres/{id}/editSelect', fieldValues, {id});
}

export function deleteMusicGenreBatch(ids) {
    return postJson('musicChat/musics/genres/deleteBatch', ids);
}

export function getMusicDetailList(param) {
    return getJson('musicChat/musics/details', param);
}

export function addMusicDetail(fieldValues) {
    return postForm('musicChat/musics/details', fieldValues);
}

export function deleteMusicDetailBatch(ids) {
    return postJson('musicChat/musics/details/deleteBatch', ids);
}

export function getAllMusicGenres() {
    return getJson('musicChat/musics/genres', {pageSize: 9999}).then(res => {
        return res.data.map(item => ({
            value: item.id,
            text: item.name
        }))
    })
}
