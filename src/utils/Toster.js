import { Position, Toaster, Intent } from '@blueprintjs/core';
import AuthorizeError from '../common/AuthorizeError';
import CommonError from '../common/CommonError';

const toastTimeout = 5000;
const toastTimeoutSuccess = 2000;

const toaster = Toaster.create({
    position: Position.TOP
})

export default toaster;

export function showLoginToast() {
    toaster.show({
        message: 'Welcome to Alice\'s Wonderland!',
        iconName: 'pt-icon-hand',
        intent: Intent.SUCCESS,
        timeout: toastTimeout
    });
}

export function showLogoutToast() {
    toaster.show({
        message: 'See you, my friend!',
        iconName: 'pt-icon-hand',
        intent: Intent.NONE,
        timeout: toastTimeout
    });
}

export function showFetchError(err) {
    logError(err);

    if (err instanceof AuthorizeError) {
        return;
    }

    let errorMessage = 'Please try later.';

    if (err.message && err.code) {
        errorMessage = `${subErrorMessage(err.message)} (code ${err.code})`;
    }

    toaster.show({
        message: 'Opps, sorry! ' + errorMessage,
        iconName: 'pt-icon-hand',
        intent: Intent.WARNING,
        timeout: toastTimeout
    });
}

export function showOperationError(err) {
    logError(err);

    if (err instanceof AuthorizeError) {
        return;
    }

    let errorMessage = 'Something went wrong.';

    if (err.message && err.code) {
        errorMessage = `${subErrorMessage(err.message)} (code ${err.code})`;
    }

    toaster.show({
        message: 'Oh, sorry! ' + errorMessage,
        iconName: 'pt-icon-graph-remove',
        intent: Intent.WARNING,
        timeout: toastTimeout
    });
}

export function showOperationSuccess() {
    toaster.show({
        message: 'Operation success!',
        iconName: 'pt-icon-thumbs-up',
        intent: Intent.SUCCESS,
        timeout: toastTimeoutSuccess
    });
}

function logError(err) {
    if (err.stack != null) {
        console.error(err.stack);
    } else {
        console.error(err);
    }
}

function subErrorMessage(errorMessage, maxLength = 30) {
    if (errorMessage == null) {
        return '';
    }

    if (errorMessage.length > maxLength) {
        return errorMessage.substring(0, maxLength) + '...';
    }

    return errorMessage;
}