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
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import echartTheme from '../echartTheme';

export default class Pie extends React.Component {

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme);
    }

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
            },
            tooltip: {
                trigger:'item',
                formatter: '{a}<br/>{b}: {c}({d}%)'
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {
                            value: 1000,
                            name: 'Mon'
                        },
                        {
                            value: 1000,
                            name: 'Tue'
                        },
                        {
                            value: 2000,
                            name: 'Wed'
                        },
                        {
                            value: 1500,
                            name: 'Thur'
                        },
                        {
                            value: 3000,
                            name: 'Fri'
                        },
                        {
                            value: 2000,
                            name: 'Sat'
                        },
                        {
                            value: 1200,
                            name: 'Sun'
                        },
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单Donut',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
            },
            tooltip: {
                trigger:'item',
                formatter: '{a}<br/>{b}: {c}({d}%)'
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '60%'],
                    data: [
                        {
                            value: 1000,
                            name: 'Mon'
                        },
                        {
                            value: 1000,
                            name: 'Tue'
                        },
                        {
                            value: 2000,
                            name: 'Wed'
                        },
                        {
                            value: 1500,
                            name: 'Thur'
                        },
                        {
                            value: 3000,
                            name: 'Fri'
                        },
                        {
                            value: 2000,
                            name: 'Sat'
                        },
                        {
                            value: 1200,
                            name: 'Sun'
                        },
                    ]
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单Donut',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
            },
            tooltip: {
                trigger:'item',
                formatter: '{a}<br/>{b}: {c}({d}%)'
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    // radius: '75%',
                    // center: ['50%', '60%'],
                    data: [
                        {
                            value: 1000,
                            name: 'Mon'
                        },
                        {
                            value: 1000,
                            name: 'Tue'
                        },
                        {
                            value: 2000,
                            name: 'Wed'
                        },
                        {
                            value: 1500,
                            name: 'Thur'
                        },
                        {
                            value: 3000,
                            name: 'Fri'
                        },
                        {
                            value: 2000,
                            name: 'Sat'
                        },
                        {
                            value: 1200,
                            name: 'Sun'
                        },
                    ].sort((a, b) => (a.value - b.value)),
                    roseType: 'radius',

                }
            ]
        }
        return option;
    }

    render() {
        return (
            <Row style={{marginTop: "50px", marginLeft: "10px", marginRight: "10px"}}>
                <Col>
                    <Card>
                        <Card.Header>饼形图表1</Card.Header>
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
                    <Card>
                        <Card.Header>饼形图表2</Card.Header>
                        <Card.Body>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={this.getOption2()}
                            theme='Imooc'
                            />
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col>
                    <Card>
                        <Card.Header>饼形图表3</Card.Header>
                        <Card.Body>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={this.getOption3()}
                            theme='Imooc'
                            />
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
        );
    }
}