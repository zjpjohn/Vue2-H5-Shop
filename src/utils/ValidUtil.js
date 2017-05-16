/**
 * Created by konie on 16-9-10.
 */

/**
 * 判断是否时非空字符串
 * @param source
 * @param trim
 * @returns {boolean}
 */
export function isNonEmptyString(source, trim = false) {
    if (typeof source !== 'string') {
        return false;
    }

    if (source.length === 0) {
        return false;
    }

    if (trim && source.trim().length === 0) {
        return false;
    }

    return true;
}

/**
 * 判断是否是数字
 */
export function isNumber(number) {
    if (typeof number === 'number' && !isNaN(number)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否是非空数组
 */
export function isNotEmptyArray(array) {
    if (!Array.isArray(array)) return false;

    return array.length > 0;
}

/**
 * 判断文件是否是支持的图片类型
 */
export function filenameIsSupportedImage(filename) {
    if (filename == null) return false;
    const rex = /.+(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png|.ICO|.ico|.WEBP|.webp)$/;
    return rex.test(filename);
}