import * as ValidUtil from './ValidUtil';

/**
 * 创建href
 */
export function createHref(path) {
    if (!ValidUtil.isNonEmptyString(path)) {
        throw new Error('path must be not empty string');
    }

    if (path === '#' || path === '/') {
        return '#';
    }

    path = trimStartSlash(path);

    return '#/' + path;
}

export function createMenuHref(basePath, path) {
    if (!ValidUtil.isNonEmptyString(path)) {
        throw new Error('path must be not empty string');
    }

    if (basePath == null) {
        return path;
    }

    basePath = trimEndSlash(basePath);

    path = trimStartSlash(path);

    path = basePath + '/' + path;
    return createHref(path);
}

export function trimStartSlash(path) {
    if (path.indexOf('/') === 0) {
        path = path.substring(1, path.length)
    }

    return path;
}

export function trimEndSlash(path) {
    if (path.lastIndexOf('/') === path.length - 1) {
        path = path.substring(0, path.length - 1)
    }

    return path;
}
