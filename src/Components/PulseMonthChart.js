import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { handleResponse, getPulse } from "../Shared/services"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PulseMonthChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pulseMeasure: [],
    }
  }

  async componentDidMount() {
    const pulseMeasure = await handleResponse(async () => await getPulse(this.props.userInfo))
    //var chart = this.chart;
    pulseMeasure.length && this.setState({ pulseMeasure: pulseMeasure })
    //chart.render();
  };

  render() {
    const dataPoints = this.state.pulseMeasure.map(measurement => ({
      x: new Date(measurement.createdAt),
      y: measurement.pulse
    }))

    const options = {
      theme: "dark2",
      exportEnabled: false,
      animationEnabled: false,
      title: {
        text: "Pomiary pulsu"
      },
      axisX: {
        //valueFormatString: "YYYY"
      },
      axisY: {
        title: "Puls [bpm]",
        suffix: "bpm"
      },
      data: [{
        type: "scatter",
        //indexLabel: "{y[#index]}",
        xValueFormatString: "DD MM YYYY",
        //yValueFromatSring: "bpm",
        //toolTipContent:"<strong>{x}</strong></br> Max: {y[1]}<br/> Min: {y[0]}",
        dataPoints: dataPoints
      }]


    }

    return (
      <div>
        { this.state.pulseMeasure.length ? <CanvasJSChart options={options}
          onRef={ref => this.chart = ref}
        /> : <h4>Brak pomiarów</h4>}
      </div>
    );
  }
}

export default PulseMonthChart