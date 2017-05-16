import { getJson, postJsonForDownload } from '../utils/FetchUtil';

export function getFeedbackList(params) {
    return getJson('feedbacks', params);
}

export function exportFeedbackList(params, titles) {
    return postJsonForDownload('feedbacks/export', {params, titles}, 'Feedback List.xlsx');
}