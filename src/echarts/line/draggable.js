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

export default class Draggable extends React.Component {

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
    componentDidMount() {
        this.echartsInstance = this.echartsReactRef.getEchartsInstance();
    }

    render() {
        return (
            <Row style={{marginTop: "50px", marginLeft: "15%", marginRight: "15%"}}>
                <Col><Card>
                    <Card.Header>可点击图表</Card.Header>
                    <Card.Body>
                    <ReactEchartsCore
                        ref={(e) => {
                            this.echartsReactRef = e;
                        }}
                        echarts={echarts}
                        option={this.getOption()}
                        theme='Imooc'
                        />
                    </Card.Body>
                </Card></Col>
            </Row>
        );
    }
}