import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { handleResponse, getPulse } from "../Shared/services"
import moment from 'moment'


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
    pulseMeasure.length && this.setState({ pulseMeasure: pulseMeasure })
    console.log(pulseMeasure)
  };

  datesGroupByComponent = (dates, token) => {
    return dates.reduce(function(val, obj) {
      let comp = moment(obj['createdAt'], 'YYYY-MM-DD HH:mm Z').format(token);
      (val[comp] = val[comp] || []).push(obj);
      return val;
    }, {});
  }

  render() {
    console.log('W', this.datesGroupByComponent(this.state.pulseMeasure, 'w'))
    const dataPoints = this.state.pulseMeasure.map(measurement => ({
      x: new Date(measurement.createdAt),
      y: measurement.pulse
    })).filter(el => el.x.toString().includes('May'))


    const options = {
      theme: "light1",
      exportEnabled: false,
      animationEnabled: true,
      interactivityEnabled: true,
      width: '700',
      axisY: {
        title: "Puls [bpm]",
        suffix: "bpm"
      },
      axisX: {
        xValueFormatString: "DD MM YYYY",
      },
      data: [{
        type: "scatter",
        xValueFormatString: "DD MM YYYY HH:HH",
        yValueFromatSring: "bpm",
        dataPoints: dataPoints
      }]
    }

    return (
      <div className="container mx-auto" style={{width: '700px'}}>
      { this.state.pulseMeasure.length ? <CanvasJSChart options={options} /> : <h4>Brak pomiarów</h4>}
      </div>
    );
  }
}

export default PulseChart