import * as ChatMusicDetailAction from '../../actions/ChatMusicDetailAction';

const defaultState = {
    total: 0,
    loading: false,
    pager: {
        current: 1,
        pageSize: 10,
    },
    sorter: {
        sortField: 'created_at',
        sortOrder: 'descend'
    },
    filters: {},
    search: {},
    selectedRowKeys: [],
    genres: []
}

export default function (state = defaultState, action) {
    switch(action.type) {
        case ChatMusicDetailAction.AT_CHAT_MUSIC_DETAIL_RESET_PARAMS:
            return defaultState;

        case ChatMusicDetailAction.AT_CHAT_MUSIC_DETAIL_UPDATE_SEARCH_PARAMS:
            return Object.assign({}, state, {
                search: action.payload,
                pager: {
                    current: 1,
                    pageSize: state.pager.pageSize
                }
            });

        case ChatMusicDetailAction.AT_CHAT_MUSIC_DETAIL_UPDATE_FILTER_PARAMS:
            return Object.assign({}, state, {
                pager: action.payload.pager,
                sorter: action.payload.sorter,
                filters: action.payload.filters
            });

        case ChatMusicDetailAction.AT_CHAT_MUSIC_DETAIL_UPDATE_LIST_DATA:
            return Object.assign({}, state, {
                data: action.payload.data,
                loading: false,
                total: action.payload.total,
                selectedRowKeys: []
            });

        case ChatMusicDetailAction.AT_CHAT_MUSIC_DETAIL_UPDATE_LOADING:
            return Object.assign({}, state, {
                loading: action.payload
            });

        case ChatMusicDetailAction.AT_CHAT_MUSIC_DETAIL_UPDATE_SELECT_ROWS:
            return Object.assign({}, state, {
                selectedRowKeys: action.payload
            });

        case ChatMusicDetailAction.AT_CHAT_MUSIC_DETAIL_UPDATE_AVAIABLE_GENRES:
            return Object.assign({}, state, {
                genres: action.payload
            });

        default:
            return state;
    }
}