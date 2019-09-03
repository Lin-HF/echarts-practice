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
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import echartTheme from '../echartTheme';

export default class Line extends React.Component {

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme);
    }

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger:'axis',
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger:'axis',
            },
            legend : {
                data: ['OFO订单量', 'mobai订单量']
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: 'mobai订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger:'axis',
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <Row style={{marginTop: "50px", marginLeft: "10px", marginRight: "10px"}}>
                <Col><Card>
                    <Card.Header>折线图表1</Card.Header>
                    <Card.Body>
                    <ReactEchartsCore
                        echarts={echarts}
                        option={this.getOption()}
                        theme='Imooc'
                        />
                    </Card.Body>
                </Card></Col>
                

                <Col><Card>
                    <Card.Header>折线图表2</Card.Header>
                    <Card.Body>
                    <ReactEchartsCore
                        echarts={echarts}
                        option={this.getOption2()}
                        theme='Imooc'
                        />
                    </Card.Body>
                </Card></Col>
                

                <Col><Card>
                    <Card.Header>折线图表3</Card.Header>
                    <Card.Body>
                    <ReactEchartsCore
                        echarts={echarts}
                        option={this.getOption3()}
                        theme='Imooc'
                        />
                    </Card.Body>
                </Card></Col>
                
            </Row>
        );
    }
}