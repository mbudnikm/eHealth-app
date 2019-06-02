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
      currentWeek: parseInt(moment().format('W')),
      week: parseInt(moment().format('W')),
      measurements: [],
      groupedByWeek: {},
      weeksArray: [],
      groupedArray: []
    }
  }

  async componentWillMount() {
    const pulseMeasure = await handleResponse(async () => await getPulse(this.props.userInfo))
    this.setState({ 
        pulseMeasure: pulseMeasure, 
        groupedByWeek: this.datesGroupByComponent(pulseMeasure, 'W'),
        weeksArray: Object.keys(this.datesGroupByComponent(pulseMeasure, 'W')),
        groupedArray: Object.entries(this.datesGroupByComponent(pulseMeasure, 'W'))
    }, this.setMeasurments)
  }

  datesGroupByComponent = (dates, token) => {
    return dates.reduce(function(val, obj) {
      let comp = moment(obj['createdAt'], 'YYYY-MM-DD HH:mm Z').format(token);
      (val[comp] = val[comp] || []).push(obj);
      return val;
    }, {});
  }

  setMeasurments = () => {
    if (this.state.weeksArray.includes(this.state.week.toString())){
      const idx = this.state.weeksArray.indexOf(this.state.week.toString())
      this.setState({ measurements: this.state.groupedArray[idx][1]})
    } else {
      this.setState({measurements: []})
    }
  }

  previuosWeek = () => {
    this.setState({week: this.state.week - 1}, this.setMeasurments)
  }

  nextWeek = () => {
    this.setState({week: this.state.week + 1}, this.setMeasurments)
  }

  render() {
    const dataPoints = this.state.measurements.map(measurement => ({
      x: new Date(measurement.createdAt),
      y: measurement.pulse
    }))


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

    const weekStartDate = moment().day("Monday").week(this.state.week).startOf('isoWeek').format("DD.MM")
    const weekEndDate = moment().day("Monday").week(this.state.week).endOf('isoWeek').format("DD.MM")

    return (
      <>
        <div className="container mt-2 mb-2 d-flex flex-row justify-content-around" style={{width: '700px'}}>
          <button className="btn btn-outline-primary" onClick={this.previuosWeek}>
            <i className="fa fa-angle-left" /> Poprzedni tydzień
          </button>
          <h2>{weekStartDate} - {weekEndDate}</h2>
          { this.state.week < this.state.currentWeek && <button className="btn btn-outline-primary" onClick={this.nextWeek}>
                Następny tydzień <i className="fa fa-angle-right" />
          </button>}
        </div>
        <div className="container mx-auto" style={{width: '700px'}}>
          { this.state.measurements.length ? 
              <CanvasJSChart options={options} /> 
          : <h4 className="p-5">Brak pomiarów</h4>}
        </div>
      </>
    );
  }
}

export default PulseChart