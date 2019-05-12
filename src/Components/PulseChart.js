import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { handleResponse, getPulse } from "../Shared/services"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PulseChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pulseMeasure: [],
    }
  }

  async componentDidMount() {
    const pulseMeasure = await handleResponse(async () => await getPulse(this.props.userInfo))
    pulseMeasure.length && this.setState({ pulseMeasure: pulseMeasure }, this.chart.render())
  };

  render() {
    const dataPoints = this.state.pulseMeasure.map(measurement => ({
      x: new Date(measurement.createdAt),
      y: measurement.pulse
    })).filter(el => el.x.toString().includes('May'))


    const options = {
      theme: "dark2",
      exportEnabled: false,
      animationEnabled: true,
      interactivityEnabled: true,
      title: {
        text: "Pomiary pulsu"
      },
      axisY: {
        title: "Puls [bpm]",
        suffix: "bpm"
      },
      axisX: {
        xValueFormatString: "DD MM YYYY",
      },
      data: [{
        type: "scatter",
        xValueFormatString: "DD MM YYYY",
        yValueFromatSring: "bpm",
        dataPoints: dataPoints
      }]
    }

    return (
      <div className="container">
  
          <CanvasJSChart options={options} onRef={ref => this.chart = ref} />
      </div>
    );
  }
}

export default PulseChart