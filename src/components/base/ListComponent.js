import BaseComponent from './BaseComponent';
import { InputHelper } from '../form/FormItem';

export default class ListComponent extends BaseComponent {
    static mapStateToProps(state) {
        return {
            listData: {}
        }
    }

    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: null,
            requestList: null,
            requestExportList: null,
            updateSearchParams: null,
            updateFilterParams: null,
            updateSelectRows: null,
        }
    }

    constructor(props) {
        super(props);
        this.inputHelper = new InputHelper();
    }

    /**
     * 表格结构
     * @return {*[]}
     */
    getColumns() {
        return [];
    }

    /**
     * 获取记录key
     */
    getRowKey(record) {
        return record.id;
    }

    /**
     * 获取行序号
     * @param rowIndex
     * @return {*}
     */
    getRowSort(rowIndex) {
        let sort = rowIndex + 1;
        const {listData} = this.props;

        if (listData != null) {
            const pager = listData.pager;
            sort += pager.pageSize * (pager.current - 1);
        }

        return sort;
    }

    /**
     * 表格列选择事件
     * @return {{onChange: (function(*, *=)), onSelect: (function(*=, *=, *=)), onSelectAll: (function(*=, *=, *=))}}
     */
    getRowSelection() {
        const {updateSelectRows, listData} = this.props;

        return {
            selectedRowKeys: listData.selectedRowKeys,
            onChange(selectedRowKeys, selectedRows) {
                updateSelectRows(selectedRowKeys);
            },
        };
    }

    /**
     * 分页器
     * @param total
     * @return {{total: *, showSizeChanger: boolean}}
     */
    getPagination(total, current) {
        return {
            current: current,
            total: total,
            showSizeChanger: true,
            showTotal:(total,range) => {
                return `Total: ${total} items`
            }
        }
    }

    /**
     * 分页、排序、筛选变化时触发
     * @param pagination
     * @param filters
     * @param sorter
     */
    handleTableChange(pagination, filters, sorter) {
        const {updateFilterParams, requestList} = this.props;

        const orderField = this.getColumnSortField(sorter.field);

        let filtersMofity = {};
        for (let key of Object.keys(filters)) {
            let value = filters[key];
            if (Array.isArray(value)) {
                filtersMofity[key] = value.join(',');
            } else {
                filtersMofity[key] = value;
            }
        }

        updateFilterParams({
            pager: {
                current: pagination.current,
                pageSize: pagination.pageSize
            },
            sorter: {
                sortField: orderField,
                sortOrder: sorter.order,
            },
            filters: filtersMofity
        });

        requestList();
    }

    /**
     * 搜索表单提交
     */
    handleSearchFormSubmit() {
        const {updateSearchParams, requestList} = this.props;

        const values = this.beforeSearchFormSubmit(this.inputHelper.getValues());

        updateSearchParams(values);
        requestList();
    }

    /**
     * 提交前处理
     */
    beforeSearchFormSubmit(values) {
        return values;
    }

    /**
     * 清除搜索表单
     */
    handleSearchFormClear() {
        this.inputHelper.setValues({});
    }

    /**
     * 导出数据的标题
     */
    getExportTitles() {
        const titles = this.getColumns().filter(item => item.title != null && item.dataIndex != null).map(item => {
            return {
                title: item.title,
                index: item.dataIndex,
                filters: item.filters,
                type: item.type
            }
        });
        return titles;
    }

    /**
     * 导出数据
     */
    handleExport(page, pageSize) {
        const titles = this.getExportTitles();
        const {requestExportList, updateSearchParams} = this.props;

        const values = this.inputHelper.getValues();

        updateSearchParams(values);

        if (requestExportList != null) {
            requestExportList(page, pageSize, titles);
        }
    }

    componentDidMount() {
        const {requestResetQueryParams, requestList} = this.props;
        requestResetQueryParams();
    }

    getColumnSortOrder(sorter, field) {
        if (sorter == null || sorter.sortField == null || sorter.sortOrder == null) {
            return false;
        }

        if (sorter.sortField === field) {
            return sorter.sortOrder;
        }
    }

    getColumnSortField(dataIndex) {
        const columns = this.getColumns();

        for (let item of columns) {
            if (item.dataIndex === dataIndex) {
                return item.sortField || item.dataIndex;
            }
        }

        return dataIndex;
    }

}
