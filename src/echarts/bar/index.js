import React from 'react';
import { Card } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
//简单加载
// import ReactEcharts from 'echarts-for-react';

// 按需加载
// import the core library.
import ReactEchartsCore from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markPoint';

import echartTheme from '../echartTheme';


export default class Bar extends React.Component {

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme);
    }

    getOption = () => {
        let option = {
            // color: ['#3398DB'],
            title: {
                text: '用户骑行订单'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Number of Nodes',
                    type: 'bar',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            // color: ['#3398DB', 'red', 'green'],
            title: {
                text: '世界人口总量',
                subtext: '数据来自网络'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年', '2012年', '2013年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data:[10, 52, 200, 334, 390, 330, 220]
                },
                {
                    name: '2012年',
                    type: 'bar',
                    data:[20, 72, 220, 304, 290, 310, 200]
                },
                {
                    name: '2013年',
                    type: 'bar',
                    data:[30, 92, 250, 314, 350, 300, 210]
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            // color: ['#3398DB', 'red', 'green'],
            title: {
                text: '用户骑行订单'
            },
            legend: {
                data: ['2011年', '2012年', '2012年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Number of Nodes',
                    type: 'bar',
                    data:[10, 52, 200, 334, 390, 330, 220]
                },
                {
                    name: 'Number of Nodes2',
                    type: 'bar',
                    data:[20, 72, 220, 304, 290, 310, 200]
                },
                {
                    name: 'Number of Nodes3',
                    type: 'bar',
                    data:[30, 92, 250, 314, 350, 300, 210]
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <Row>
                <Col>
                    <Card style={{display: "inline-block", width: "80%", height: "100%"}}>
                        <Card.Header>柱形图表之一</Card.Header>
                        <Card.Body>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={this.getOption()}
                            theme='Imooc'
                            />
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col>
                    <Card style={{display: "inline-block", width: "80%",  height: "100%"}}>
                        <Card.Header>柱形图表之二</Card.Header>
                        <Card.Body>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={this.getOption2()}
                            theme='Imooc'
                            />
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
        );
    }
}