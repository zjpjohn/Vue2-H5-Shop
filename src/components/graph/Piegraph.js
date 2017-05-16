import React from 'react';
import {connect} from 'react-redux';
import ListComponent from '../base/ListComponent';
import createG2 from 'g2-react';
import G2,{ Stat,Frame } from 'g2';
import * as PiegraphAction from '../../actions/PiegraphAction';
import {Select,Form,Spin} from 'antd'
const Option = Select.Option;
const FormItem = Form.Item;
class Piegraph extends ListComponent {
    static mapStateToProps(state) {
        return {
            listData: state.graph.piegraph
        }
    }
    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams:PiegraphAction.requestResetQueryParams,
            updateClassify:PiegraphAction.updateClassify,
        }
    }
    componentDidMount(){
        console.log("进入到 Piegraph 页面！",this.props);
        this.props.requestResetQueryParams();
    }
    handleChange(value){
        console.log(`selected ${value}`);
        this.props.updateClassify(value);
    }
    render(){
        const {listData} = this.props;
        let show=true;
        if(listData.data!=''){
            show=false;
        }
        const Chart = createG2(chart => {
            var Stat = G2.Stat;
            // 重要：绘制饼图时，必须声明 theta 坐标系
            chart.coord('theta', {
                radius: 0.8 // 设置饼图的大小
            });
            chart.legend('name', {
                position: 'bottom',
                itemWrap: true,
                formatter: function(val) {
                    for(var i = 0, len = listData.data.length; i < len; i++) {
                        var obj = listData.data[i];
                        if (obj.name === val) {
                            return val + ': ' + obj.value;
                        }
                    }
                }
            });
            chart.tooltip({
                title: null,
                map: {
                    value: 'value'
                }
            });
            chart.intervalStack()
                .position(Stat.summary.percent('value'))
                .color('name')
                .label('name*..percent',function(name, percent){
                    percent = (percent * 100).toFixed(2) + '%';
                    return name + ' ' + percent;
                });
            chart.render();
            // 设置默认选中
            var geom = chart.getGeoms()[0]; // 获取所有的图形
            var items = geom.getData(); // 获取图形对应的数据
            geom.setSelected(items[1]); // 设置选中
        });
        const ChartOther = createG2(chart => {
            var Stat = G2.Stat;
            // 重要：绘制饼图时，必须声明 theta 坐标系
            chart.coord('theta', {
                radius: 0.8 // 设置饼图的大小
            });
            chart.legend('name', {
                position: 'bottom',
                itemWrap: true,
                formatter: function(val) {
                    for(var i = 0, len = listData.ageData.length; i < len; i++) {
                        var obj = listData.ageData[i];
                        if (obj.name === val) {
                            return val + ': ' + obj.value;
                        }
                    }
                }
            });
            chart.tooltip({
                title: null,
                map: {
                    value: 'value'
                }
            });
            chart.intervalStack()
                .position(Stat.summary.percent('value'))
                .color('name')
                .label('name*..percent',function(name, percent){
                    percent = (percent * 100).toFixed(2) + '%';
                    return name + ' ' + percent;
                });
            chart.render();
            // 设置默认选中
            var geom = chart.getGeoms()[0]; // 获取所有的图形
            var items = geom.getData(); // 获取图形对应的数据
            geom.setSelected(items[1]); // 设置选中
        });
        return(
          <div>
            <div>
                <Spin spinning={listData.loading} tip="Loading..." size="large">
                    <h1 style={{display:'block',margin:'30px auto',width:'500px',textAlign:'center'}}>用户年龄分布</h1>
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
                    {
                            show==false? <ChartOther
                            data={listData.ageData}
                            width={listData.width}
                            height={listData.height}
                            forceFit={listData.forceFit} /> :null
                     }
                </Spin>
             </div>
              <div>
                  <h1 style={{display:'block',margin:'30px auto',width:'500px',textAlign:'center'}}>用户性别分布</h1>
                  {
                      show==false? <Chart
                          data={listData.data}
                          width={listData.width}
                          height={listData.height}
                          forceFit={listData.forceFit} /> :null
                  }
              </div>
          </div>
        )
    }
}
export default connect(
    Piegraph.mapStateToProps,
    Piegraph.wrapActionMap(Piegraph.getMapDispatchToProps)
)(Piegraph)
/*
{
    show==false? <Chart
        data={listData.data}
        width={listData.width}
        height={listData.height}
        forceFit={listData.forceFit} /> :null
}*/
