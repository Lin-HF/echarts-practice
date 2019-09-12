import React from 'react';
import { Card } from 'react-bootstrap';

import ReactEchartsCore from 'echarts-for-react/lib/core';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import echartTheme from '../echartTheme';

export default class Graph extends React.Component {

    state = {
        data: null
    }

    componentDidMount() {
        // let myChart = echarts.init(document.getElementById("net"));
        // myChart.setOption(this.getOption());
    }

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme);
        // echarts.init();
        
        // let myChart = echarts.init();
    }
    
    getOption = () => {
        let option = {
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            title: {
                text: 'Simple Graph',
                subtext: 'Default Layout'
            },
            tooltip: {
                formatter: (x)=>(x.data.des),
                position: 'center',
                
            },
            series: {
                name: 'Simple Graph',
                type: 'graph',
                layout: 'force',
                edgeSymbol: ['none', 'arrow'],
                animation: false,
                roam: true,
                label: {
                    normal: {
                        show: true
                    }
                },
                itemStyle: {
                    opacity: 1.0
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 10
                        },
                    }
                },
                edgeLabel: {
                    normal: {
                        show: true,
                        formatter: function (x) {
                            return x.data.name;
                        },
                        
                    },
                    
                },
                data: this.props.nodes,
                force: {
                    repulsion: 300,
                    edgeLength: 150
                },
                edges: this.props.edges,
                categories: this.props.categories
            }
        };
        return option;
    }

    render() {
        let coponent = null;
        if (this.props.nodes != null) {
            coponent = <ReactEchartsCore
            style={{height: '500px'}}
            echarts={echarts}
            option={this.getOption()}
            theme='Imooc'
            />
        }
        return (
            <div style={{margin: "7% 15%"}}>
                <Card>
                    <Card.Header>Graph</Card.Header>
                    <Card.Body>
                    {coponent}
                        {/* <div id="net"></div> */}
                    </Card.Body>
                </Card>
                
            </div>
        );
    }
}