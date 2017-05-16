import CommonError from './CommonError';

export default function(json) {
    if (json.code !== 0) {
        throw new CommonError(json.code, json.message);
    }

    return json.result;
}