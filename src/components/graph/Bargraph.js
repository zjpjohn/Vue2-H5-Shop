import React from 'react';
import {connect} from 'react-redux';
import {Select,Form,Spin,DatePicker,Modal} from 'antd'
import createG2 from 'g2-react';
import G2,{ Stat,Frame } from 'g2';
import * as BargraphAction from '../../actions/BargraphAction';
import ListComponent from '../base/ListComponent';
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
const Chart = createG2(chart => {
    const Stat = G2.Stat;
    chart.col('name',{alias: '距离'});
    chart.intervalDodge().position('日期*数量').color('name');
    chart.render();
});
const ChartOther = createG2(chart => {
    const Stat = G2.Stat;
    chart.col('name',{alias: '时间段'});
    chart.intervalDodge().position('日期*数量').color('name');
    chart.render();
});
class Bargraph extends ListComponent {
    static mapStateToProps(state) {
        return {
            listData: state.graph.bargraph
        }
    }
    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: BargraphAction.requestResetQueryParams,
            updateClassify:BargraphAction.updateClassify,
            updateTimeClassify:BargraphAction.updateTimeClassify,
            requestTimeData:BargraphAction.requestTimeData,
            dateDistanceSelect:BargraphAction.dateDistanceSelect,
            dateTimeSelect:BargraphAction.dateTimeSelect,
            requestDistanceData:BargraphAction.requestDistanceData,
        }
    }
    componentDidMount(){
        console.log("进入到 Bargraph 页面！",this.props);
        this.props.requestResetQueryParams();
    }
    handleChange(value){
        console.log(`selected ${value}`);
        this.props.updateClassify(value);
    }
    handleTimeChange(value){
        console.log(`selected ${value}`);
        this.props.updateTimeClassify(value);
    }
    //获取前几天的日期
    getBeforeDate(n){
        var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon=d.getMonth()+1;
        var day=d.getDate();
        if(day <= n){
            if(mon>1) {
                mon=mon-1;
            }
            else {
                year = year-1;
                mon = 12;
            }
        }
        d.setDate(d.getDate()-n);
        year = d.getFullYear();
        mon=d.getMonth()+1;
        day=d.getDate();
        var s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
        return s;
    }
    onDistanceChange(date,dateString){
       let dateStart=dateString[0];
       let dateEnd=dateString[1];
       let dateCount=this.DateDiff(dateStart,dateEnd);
       if(dateCount>7){
           Modal.error({
               title: '查询时间段大于7天，请重新选择！',
           });
       }else{
           if(dateStart==''&&dateEnd==''){
               dateEnd=this.getBeforeDate(1);
               dateStart=this.getBeforeDate(7);
               dateCount=this.DateDiff(dateEnd,dateStart);
           }
           this.props.dateDistanceSelect(dateStart,dateEnd,dateCount);
       }
    }
    onTimeChange(date,dateString){
        let dateStart=dateString[0];
        let dateEnd=dateString[1];
        let dateCount=this.DateDiff(dateStart,dateEnd);
        if(dateCount>7){
            Modal.error({
                title: '查询时间段大于7天，请重新选择！',
            });
        }else{
            if(dateStart==''&&dateEnd==''){
                dateEnd=this.getBeforeDate(1);
                dateStart=this.getBeforeDate(7);
                dateCount=this.DateDiff(dateEnd,dateStart);
            }
            this.props.dateTimeSelect(dateStart,dateEnd,dateCount);
        }
    }
    DateDiff(sDate1,sDate2){
        var  aDate,oDate1,oDate2,iDays;
        aDate  =  sDate1.split("-")
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]) //转换为12-18-2006格式
        aDate  =  sDate2.split("-")
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
        iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24) //把相差的毫秒数转换为天数
        return  iDays+1
    }
    render(){
        const {listData} = this.props;
        let show=true;
        if(listData.data!=''&&listData.timeData!=''){
            show=false;
        }

        return(
        <div>
            <div>
                <Spin spinning={listData.loading} tip="Loading..." size="large" >
                    <h1 style={{display:'block',margin:'0 auto',width:'500px',textAlign:'center'}}>用户每天跑步距离分布</h1>
                    <Form layout='inline' style={{margin:'20px'}}>
                        <FormItem
                            label="选择分类"
                            style={{margin:'20px'}}
                        >
                                <Select
                                    onChange={(...args)=>this.handleChange(...args)}
                                    style={{ width: 200 }}
                                    placeholder="总量"
                                >
                                    <Option key="all" value="">总量</Option>
                                    <Option key="male">男</Option>
                                    <Option key="female">女</Option>
                                </Select>
                        </FormItem>
                        <FormItem style={{margin:'20px'}}
                            label="选择日期"
                        >
                        <RangePicker style={{margin:'0 20px 0 0'}}
                                     disabledDate={(current)=> current && current.valueOf()>Date.now()}
                                     onChange={(...args)=>this.onDistanceChange(...args)}
                                     value={[moment(listData.search.dateStart, dateFormat), moment(listData.search.dateEnd, dateFormat)]}
                                     />
                        </FormItem>
                    </Form>
                    {
                        show==false?<Chart
                            data={listData.data}
                            width={listData.width}
                            height={listData.height}
                            plotCfg={listData.plotCfg}
                            forceFit={listData.forceFit} />:null
                    }
                </Spin>
            </div>
            <div>
                <Spin spinning={listData.loadingTime} tip="Loading..." size="large" >
                <h1 style={{display:'block',margin:'0 auto',width:'500px',textAlign:'center'}}>用户每天跑步时段分布</h1>
                <Form layout='inline' style={{margin:'20px'}}>
                    <FormItem
                        label="选择分类"
                        style={{margin:'20px'}}
                    >
                        <Select
                            onChange={(...args)=>this.handleTimeChange(...args)}
                            style={{ width: 200 }}
                            placeholder="总量"
                        >
                            <Option key="all" value="">总量</Option>
                            <Option key="male">男</Option>
                            <Option key="female">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem style={{margin:'20px'}}
                              label="选择日期"
                    >
                        <RangePicker style={{margin:'0 20px 0 0'}}
                                     disabledDate={(current)=> current && current.valueOf() > Date.now()}
                                     onChange={(...args)=>this.onTimeChange(...args)}
                                     value={[moment(listData.filter.dateStart, dateFormat), moment(listData.filter.dateEnd, dateFormat)]}
                        />
                    </FormItem>
                </Form>
                {
                    show==false?<ChartOther
                        data={listData.timeData}
                        width={listData.width}
                        height={listData.height}
                        plotCfg={listData.plotCfg}
                        forceFit={listData.forceFit} />:null
                }
                </Spin>
            </div>
        </div>
        )
    }
}
export default connect(
    Bargraph.mapStateToProps,
    Bargraph.wrapActionMap(Bargraph.getMapDispatchToProps)
)(Bargraph)
