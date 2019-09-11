import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Test2 extends Component {
    state = {
        myChart: null
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main2'));
        // 绘制图表
        // this.setState({myChart: myChart});
        // this.setState(prestate => ({
        //     myChart: prestate.myChart.setOption(this.getOption())
        // }))
        // var datas = [];
        // for (var i = 0; i < 1; i++) {
        //     datas.push({
        //         nodes: this.createNodes(16),
        //         edges: this.createEdges(16)
        //     });
        // }
        // myChart.setOption({
        //     grid: {
        //         left: '3%',
        //         right: '4%',
        //         bottom: '3%',
        //         containLabel: true,
        //     },
        //     title: {
        //         text: 'Simple Graph',
        //         subtext: 'Default Layout'
        //     },
        //     tooltip: {
        //         formatter: (x)=>(x.data.name + ' source ' + x.data.source + " -> " + x.data.target) 
        //     },
        //     series: {
        //         name: 'Simple Graph',
        //         type: 'graph',
        //         layout: 'force',
        //         edgeSymbol: ['none', 'arrow'],
        //         animation: false,
        //         roam: true,
        //         label: {
        //             normal: {
        //                 show: true
        //             }
        //         },
        //         itemStyle: {
        //             opacity: 1.0,
        //         },
        //         label: {
        //             normal: {
        //                 show: true,
        //                 textStyle: {
        //                     fontSize: 10
        //                 },
        //             }
        //         },
        //         edgeLabel: {
        //             normal: {
        //                 show: true,
        //                 formatter: function (x) {
        //                     return x.data.name;
        //                 },
                        
        //             },
                    
        //         },
        //         data: datas[0].nodes,
        //         force: {
        //             repulsion: 1000,
        //             edgeLength: 30
        //         },
        //         edges: datas[0].edges.map(function (e) {
        //             return {
        //                 name: 'Edge' + e[0] + " " + e[1],
        //                 des: 'this is description',
        //                 source: e[0],
        //                 target: e[1]
        //             };
        //         }),
        //     }
        // })

        // myChart.setOption({
        //     graphic: echarts.util.map(datas[0], (dataItem, dataIndex) => {
        //         return {
        //             type: 'circle',
        //             shape: {
        //                 r: dataItem.symbolSize / 2
        //             },
        //             position: this.state.myChart.convertToPixel('grid', dataItem),
        //             invisible: true,
        //             draggable: true,
        //             z: 100,
        //             ondrag: echarts.util.curry((dataIndex) => {
        //                 datas[dataIndex] = this.state.myChart.convertFromPixel('grid', this.position);
        //                 echarts.setOption({
        //                     series: [{
        //                         id: 'a',
        //                         datas: datas
        //                     }]
        //                 });
        //             }, dataIndex)
        //         }
        //     } )
        // })
        var symbolSize = 20;

        // 这个 data 变量在这里单独声明，在后面也会用到。
        var data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];
        myChart.setOption({
            xAxis: {
                min: -100,
                max: 80,
                type: 'value',
                axisLine: {onZero: false}
            },
            yAxis: {
                min: -30,
                max: 60,
                type: 'value',
                axisLine: {onZero: false}
            },
            series: [
                {
                    id: 'a',
                    type: 'line',
                    smooth: true,
                    symbolSize: symbolSize, // 为了方便拖拽，把 symbolSize 尺寸设大了。
                    data: data
                }
            ]
        });

        function onPointDragging(dataIndex) {
            // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
            // 这里的 this 就是被拖拽的圆点。this.position 就是圆点当前的位置。
            data[dataIndex] = myChart.convertFromPixel('grid', this.position);
            // 用更新后的 data，重绘折线图。
            myChart.setOption({
                series: [{
                    id: 'a',
                    data: data
                }]
            });
        }

        myChart.setOption({
            // 声明一个 graphic component，里面有若干个 type 为 'circle' 的 graphic elements。
            // 这里使用了 echarts.util.map 这个帮助方法，其行为和 Array.prototype.map 一样，但是兼容 es5 以下的环境。
            // 用 map 方法遍历 data 的每项，为每项生成一个圆点。
            graphic: echarts.util.map(data, function (dataItem, dataIndex) {
                return {
                    // 'circle' 表示这个 graphic element 的类型是圆点。
                    type: 'circle',
        
                    shape: {
                        // 圆点的半径。
                        r: symbolSize / 2
                    },
                    // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
                    // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
                    position: myChart.convertToPixel('grid', dataItem),
        
                    // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
                    invisible: true,
                    // 这个属性让圆点可以被拖拽。
                    draggable: true,
                    // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
                    z: 100,
                    // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
                    // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
                    // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
                    ondrag: echarts.util.curry(onPointDragging, dataIndex)
                };
            })
        });

        window.addEventListener('resize', function () {
            // 对每个拖拽圆点重新计算位置，并用 setOption 更新。
            myChart.setOption({
                graphic: echarts.util.map(data, function (item, dataIndex) {
                    return {
                        position: myChart.convertToPixel('grid', item)
                    };
                })
            });
        });
        myChart.setOption({
            
            tooltip: {
                // 表示不使用默认的『显示』『隐藏』触发规则。
                triggerOn: 'none',
                formatter: function (params) {
                    return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
                }
            }
        });
        myChart.setOption({
            graphic: echarts.util.map(data, function (item, dataIndex) {
                return {
                    type: 'circle',
                    
                    // 在 mouseover 的时候显示，在 mouseout 的时候隐藏。
                    onmousemove: echarts.util.curry(showTooltip, dataIndex),
                    onmouseout: echarts.util.curry(hideTooltip, dataIndex),
                };
            })
        });
        
        function showTooltip(dataIndex) {
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: dataIndex
            });
        }
        
        function hideTooltip(dataIndex) {
            myChart.dispatchAction({
                type: 'hideTip'
            });
        }
    }

    

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
    
    getOption = () => {
        var datas = [];
        for (var i = 0; i < 1; i++) {
            datas.push({
                nodes: this.createNodes(16),
                edges: this.createEdges(16)
            });
        }
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
                itemStyle: {
                    opacity: 1.0,
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
                data: datas[0].nodes,
                force: {
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
                graphic: echarts.util.map(datas[0], (dataItem, dataIndex) => {
                    return {
                        type: 'circle',
                        shape: {
                            r: dataItem.symbolSize / 2
                        },
                        position: this.state.myChart.convertToPixel('grid', dataItem),
                        invisible: true,
                        draggable: true,
                        z: 100,
                        ondrag: echarts.util.curry((dataIndex) => {
                            datas[dataIndex] = this.state.myChart.convertFromPixel('grid', this.position);
                            echarts.setOption({
                                series: [{
                                    id: 'a',
                                    datas: datas
                                }]
                            });
                        }, dataIndex)
                    }
                } )
            }
        };
        return option;
    }
    render() {
        
        return (
            <div id="main2" style={{ margin:"auto", width: 800, height: 400 }}></div>
        );
    }
}

export default Test2;