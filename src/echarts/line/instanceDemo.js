import React, { Component } from "react";


import echarts from "echarts/lib/echarts";

import "echarts/lib/chart/line";

import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

class EchartsTest extends Component {
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    var symbolSize = 20;
    var data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];
    // 绘制图表
    myChart.setOption({
      tooltip: {
        triggerOn: "none",
        formatter: function(params) {
          return (
            "X: " +
            params.data[0].toFixed(2) +
            "<br>Y: " +
            params.data[1].toFixed(2)
          );
        }
      },
      xAxis: {
        min: -100,
        max: 80,
        type: "value",
        axisLine: { onZero: false }
      },
      yAxis: {
        min: -30,
        max: 60,
        type: "value",
        axisLine: { onZero: false }
      },
      series: [
        {
          id: "a",
          type: "line",
          smooth: true,
          symbolSize: symbolSize,
          data: data
        }
      ]
    });
    function onclicklog(dataIndex) {
      console.log(dataIndex + "is clicked!");
    }
    // function showTooltip(dataIndex) {
    //   myChart.dispatchAction({
    //     type: "showTip",
    //     seriesIndex: 0,
    //     dataIndex: dataIndex
    //   });
    // }
    myChart.setOption({
      graphic: echarts.util.map(data, function(item, dataIndex) {
        //   console.log("working!");
        return {
          type: "circle",
          position: myChart.convertToPixel("grid", item),
          shape: {
            r: symbolSize / 2
          },
        //   invisible: true,
          draggable: true,
          onclick: echarts.util.curry(onclicklog, dataIndex),
          // ondrag: echarts.util.curry(onPointDragging, dataIndex),
        //   onmousemove: echarts.util.curry(showTooltip, dataIndex),
          // onmouseout: echarts.util.curry(hideTooltip, dataIndex),
          z: 100
        };
      })
    });
  }

  render() {
    return <div id="main" style={{ width: 400, height: 400 }}>
        <button onclik={this.changeClick}>单击实现拖拽</button>
    </div>;
  }
}

export default EchartsTest;
