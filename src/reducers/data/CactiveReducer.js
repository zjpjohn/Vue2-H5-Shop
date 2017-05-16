import * as CactiveStatsAction from '../../actions/CactiveStatsAction';

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
    channel:[],
    selectedRowKeys: []
}

export default function (state = defaultState, action) {
    switch(action.type) {
        case CactiveStatsAction.AT_NEW_STATS_RESET_PARAMS:
            return defaultState;

        case CactiveStatsAction.AT_NEW_STATS_UPDATE_LIST_DATA:
            return Object.assign({}, state, {
                data: action.payload.data,
                loading: false,
                total: action.payload.total,
                selectedRowKeys: []
            });
        case CactiveStatsAction.AT_NEW_STATS_UPDATE_SELECT_ROWS:
            return Object.assign({}, state, {
                selectedRowKeys: action.payload
            });
        case CactiveStatsAction.AT_NEW_STATS_GET_VERSION:
            return Object.assign({}, state, {
                channel: action.payload
            });
        case CactiveStatsAction.AT_NEW_STATS_UPDATE_LOADING:
            return Object.assign({}, state, {
                loading: action.payload
            });
        case CactiveStatsAction.AT_NEW_STATS_UPDATE_FILTER_PARAMS:
            return Object.assign({}, state, {
                pager: action.payload.pager,
                sorter: action.payload.sorter,
                filters: action.payload.filters
            });
        case CactiveStatsAction.AT_NEW_STATS_UPDATE_SEARCH_PARAMS:
            return Object.assign({}, state, {
                search: action.payload,
                pager: {
                    current: 1,
                    pageSize: state.pager.pageSize
                },
                sorter: {
                    sortField: 'created_at',
                    sortOrder: 'descend'
                },
            });
        default:
            return state;
    }
}

