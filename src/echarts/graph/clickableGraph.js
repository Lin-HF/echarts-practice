import React, { Component } from "react";


import echarts from "echarts/lib/echarts";

import "echarts/lib/chart/graph";

import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

class GraphTest extends Component {
    createNodes = (count) => {
        var nodes = [];
        for (var i = 0; i < count; i++) {
            nodes.push({
                id: i,
                name: 'Node' + i,
                itemStyle : null,
                symbolSize : 50,
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
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    var datas = [];
        for (var i = 0; i < 1; i++) {
            datas.push({
                nodes: this.createNodes(16),
                edges: this.createEdges(16)
            });
        }
    // 绘制图表
    myChart.setOption({
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            // height: '500px'
        },
        title: {
            text: 'Simple Graph',
            subtext: 'Default Layout'
        },
        tooltip: {
            formatter: (x)=>(x.data.name + ' source ' + x.data.source + " -> " + x.data.target) 
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
            // edgeSymbol: ['none', 'arrow'],
            itemStyle: {
                // color: 'rgba(128, 128, 128, 0.5)',
                opacity: 1.0,
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 10
                    },
                    // position: 'right'
                }
            },
            edgeLabel: {
                normal: {
                    show: true,
                    fontSize: 8,
                    formatter: function (x) {
                        return x.data.name;
                    }
                },
                
            },
            data: datas[0].nodes,
            // left: (idx % 4) * 25 + '%',
            // top: Math.floor(idx / 4) * 25 + '%',
            // width: '25%',
            // height: '25%',
            force: {
                // initLayout: 'circular'
                // gravity: 0
                repulsion: 1000,
                edgeLength: 30
            },
            edges: datas[0].edges.map(function (e) {
                return {
                    name: 'Edge' + e[0] + " " + e[1],
                    des: 'this is description',
                    source: e[0],
                    target: e[1]
                };
            }),
        }
    });
    myChart.on("click", function (param){               
        console.log(param.dataIndex);
    });
  }

  render() {
    return <div id="main" style={{ width: 400, height: 400 }}></div>;
  }
}

export default GraphTest;
