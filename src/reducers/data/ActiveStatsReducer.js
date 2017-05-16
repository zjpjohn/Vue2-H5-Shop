import * as ActiveStatsAction from '../../actions/ActiveStatsAction';
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
    selectedRowKeys: []
}

export default function (state = defaultState, action) {
    switch(action.type) {
        case ActiveStatsAction.AT_ACTIVE_STATS_RESET_PARAMS:
            return defaultState;

        case ActiveStatsAction.AT_ACTIVE_STATS_UPDATE_SEARCH_PARAMS:
            return Object.assign({}, state, {
                search: action.payload,
                pager: {
                    current: 1,
                    pageSize: state.pager.pageSize
                }
            });

        case ActiveStatsAction.AT_ACTIVE_STATS_UPDATE_FILTER_PARAMS:
            return Object.assign({}, state, {
                pager: action.payload.pager,
                sorter: action.payload.sorter,
                filters: action.payload.filters
            });

        case ActiveStatsAction.AT_ACTIVE_STATS_UPDATE_LIST_DATA:
            return Object.assign({}, state, {
                data: action.payload.data,
                loading: false,
                total: action.payload.total,
                selectedRowKeys: []
            });

        case ActiveStatsAction.AT_ACTIVE_STATS_UPDATE_LOADING:
            return Object.assign({}, state, {
                loading: action.payload
            });

        case ActiveStatsAction.AT_ACTIVE_STATS_UPDATE_SELECT_ROWS:
            return Object.assign({}, state, {
                selectedRowKeys: action.payload
            });

        default:
            return state;
    }
}
