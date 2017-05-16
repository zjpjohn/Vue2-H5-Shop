import ListCompoment from './ListComponent';
import {InputHelper} from '../form/FormItem';
import * as RenderUtil from '../../utils/RenderUtil';

export default class ListEditCompoment extends ListCompoment {
    static mapStateToProps(state) {
        return {
            listData: {},
            editItem: {}
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

            updateEditDialogOpen: null,
            updateEditFormData: null,
            updateEditFormErrorMessage: null,
            requestEditFormSubmit: null,
            updateEditItemKey: null,
            requestEditItem: null
        }
    }

    constructor(props) {
        super(props);

        this.editInputHelper = new InputHelper();
    }

    componentDidMount() {
        super.componentDidMount();
        this.handleProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.handleProps(newProps);
    }

    handleProps(props) {
        const {editItem, updateEditDialogOpen, updateEditItemKey, requestEditItem} = this.props;
        const isOpen = !!props.params.add || !!props.params.key;
        const editKey = props.params.key;

        if (isOpen != editItem.editDialogIsOpen) {
            updateEditDialogOpen(this.editInputHelper, isOpen);
        }

        if (editKey !== editItem.editKey) {
            updateEditItemKey(editKey);

            if (editKey != null) {
                requestEditItem(this.editInputHelper);
            }
        }
    }

    /**
     * 必须的属性
     */
    getRequiredProps() {
        return [
        ]
    }

    /**
     * 修改时必须的属性
     */
    getEditRequiredProps() {
        return this.getRequiredProps();
    }

    /**
     * 额外的验证，错误是调用errorCb，传递一个参数作为errorMessage
     */
    extraValidate(fieldValues, successCb, errorCb) {
        successCb();
    }    

    /**
     * 处理表单提交
     */
    handleEditFormSubmit() {
        const {updateEditFormData, requestEditFormSubmit, updateEditFormErrorMessage} = this.props;

        const values = this.editInputHelper.getValues();

        const editKey = this.props.params.key;
        let requiredProps = [];
        if (editKey == null) {
            requiredProps = this.getRequiredProps();
        } else {
            requiredProps = this.getEditRequiredProps();
        }

        this.editInputHelper.checkRequiredProps(requiredProps, () => {
            
            this.extraValidate(values, () => {
                updateEditFormErrorMessage(null);
                const fieldValues = this.beforeEditFormSubmit(this.editInputHelper.getValues());

                updateEditFormData(this.editInputHelper, fieldValues);
                requestEditFormSubmit(this.editInputHelper);
            }, errorMessage => {
                updateEditFormErrorMessage(errorMessage);
            })

            
        }, missedPropertyNames => {
            updateEditFormErrorMessage(RenderUtil.renderMissedPropertyError(missedPropertyNames));
        })
    }

    /**
     * 提交前处理
     */
    beforeEditFormSubmit(fieldValues) {
        return fieldValues;
    }
}