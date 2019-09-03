import React from 'react';
import { Card } from 'react-bootstrap';
//简单加载
// import ReactEcharts from 'echarts-for-react';
// 按需加载
// import the core library.
import ReactEchartsCore from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import echartTheme from '../echartTheme';

export default class Graph extends React.Component {

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme);
    }

    createNodes = (count) => {
        var nodes = [];
        for (var i = 0; i < count; i++) {
            nodes.push({
                id: i,
                itemStyle : null,
                symbolSize : 10,
                value : i,
                //category = node.attributes.modularity_class,
                // Use random x, y
                x : null,
                y : null,
                draggable : true,
            });
        }
        return nodes;
    }

    createEdges = (count) => {
        var edges = [];
        // if (count === 2) {
        //     return [[0, 1]];
        // }
        // for (var i = 0; i < count; i++) {
        //     edges.push([i, (i + 1) % count]);
        // }
        edges.push([0, 7]);
        edges.push([0, 1]);
        edges.push([2, 1]);
        edges.push([3, 1]);
        edges.push([3, 4]);
        edges.push([4, 5]);
        edges.push([5, 6]);
        edges.push([6, 7]);
        edges.push([7, 8]);
        edges.push([8, 9]);
        edges.push([8, 10]);
        edges.push([8, 11]);
        edges.push([11, 12]);
        edges.push([11, 13]);
        edges.push([13, 14]);
        edges.push([14, 15]);
        return edges;
    }
    
    getOption = () => {
        var datas = [];
        for (var i = 0; i < 1; i++) {
            datas.push({
                nodes: this.createNodes(16),
                edges: this.createEdges(16)
            });
        }
        let option = {
            // series: datas.map(function (item, idx) {
            //     return {
            //         name: 'Simple Grapg',
            //         type: 'graph',
            //         layout: 'force',
            //         animation: false,
            //         roam: true,
                    
            //         data: item.nodes,
            //         // left: (idx % 4) * 25 + '%',
            //         // top: Math.floor(idx / 4) * 25 + '%',
            //         // width: '25%',
            //         // height: '25%',
            //         force: {
            //             // initLayout: 'circular'
            //             // gravity: 0
            //             repulsion: 60,
            //             edgeLength: 2
            //         },
            //         edges: item.edges.map(function (e) {
            //             return {
            //                 source: e[0],
            //                 target: e[1]
            //             };
            //         })
            //     };
            // })
            title: {
                text: 'Simple Graph',
                subtext: 'Default Layout'
            },
            series: {
                name: 'Simple Grapg',
                type: 'graph',
                layout: 'force',
                animation: false,
                roam: true,
                // edgeSymbol: ['none', 'arrow'],
                itemStyle: {
                    // color: 'rgba(128, 128, 128, 0.5)',
                    opacity: 0.5,
                },
                label: {
                    normal: {
                        position: 'right'
                    }
                },
                data: datas[0].nodes,
                // left: (idx % 4) * 25 + '%',
                // top: Math.floor(idx / 4) * 25 + '%',
                // width: '25%',
                // height: '25%',
                force: {
                    // initLayout: 'circular'
                    // gravity: 0
                    repulsion: 100,
                    edgeLength: 30
                },
                edges: datas[0].edges.map(function (e) {
                    return {
                        source: e[0],
                        target: e[1]
                    };
                })
            }
        };
        return option;
    }

    render() {
        return (
            <div style={{margin: "50px 15%"}}>
                <Card>
                    <Card.Header>Graph</Card.Header>
                    <Card.Body>
                    <ReactEchartsCore
                        echarts={echarts}
                        option={this.getOption()}
                        theme='Imooc'
                        />
                    </Card.Body>
                </Card>
                
            </div>
        );
    }
}