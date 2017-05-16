import * as ImageAction from '../actions/ImageAction';

export default function(state = {}, action) {
    switch (action.type) {
        case ImageAction.AT_IMAGE_UPDATE_IMAGE_CACHE:
            let newState = Object.assign({}, state);

            for (let map of action.payload) {
                newState[map.image_name] = map.url;
            }
            return newState;

        default:
            return state;
    }
}