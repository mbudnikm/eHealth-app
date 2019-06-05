import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { handleResponse, getPulse, postPulseComment } from "../Shared/services"
import { datesGroupByComponent } from "../Shared/dateHelper"
import moment from "moment"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Pulse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pulseMeasure: [],
      week: parseInt(moment().format('W')),
      measurements: [],
      groupedByWeek: {},
      weeksArray: [],
      groupedArray: [],
      dayMeasureDataPoints: null,
      comment: null
    }
  }

  async componentWillMount() {
    const pulseMeasure = await handleResponse(async () => await getPulse(this.props.userInfo))
    this.setState({ 
        pulseMeasure: pulseMeasure, 
        groupedByWeek: datesGroupByComponent(pulseMeasure, 'W'),
        weeksArray: Object.keys(datesGroupByComponent(pulseMeasure, 'W')),
        groupedArray: Object.entries(datesGroupByComponent(pulseMeasure, 'W'))
    }, this.setMeasurments)
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

    const showDayMeasurement = (e) => {
      const measureDate = moment(e.dataPoint.x).format('YYYY-MM-DD')
      const dayMeasurement = this.state.measurements.filter((measure) => 
        moment(measure.createdAt).format('YYYY-MM-DD') === measureDate)
      const dayMeasurementDataPoints = dayMeasurement.map(measurement => ({
        x: new Date(measurement.createdAt),
        y: measurement.pulse
      }))
      dayMeasurement && this.setState({ dayMeasurementDataPoints: dayMeasurementDataPoints })
    }

    const showComment = (e) => {
      const measureDate = moment(e.dataPoint.x).format('YYYY-MM-DD HH:mm:ss')
      const singleMeasure = this.state.measurements.find((measure) => 
        moment(measure.createdAt).format('YYYY-MM-DD HH:mm:ss') === measureDate)
      this.setState({ singleMeasure: singleMeasure })
    }

    const postComment = async(e) => {
      e.preventDefault()
      const payload = {
        pulseId: this.state.singleMeasure.id,
        userId: this.props.userInfo.userId,
        auth: this.props.userInfo.auth,
        comment: {
          comment: this.state.comment
        }
      }
      const response = await handleResponse(async () => await postPulseComment(payload))
      response.status === 200 && this.setState({ 
        comment: undefined,
        singleMeasure: response.data, 
      })
    }

    const options = {
      theme: "light1",
      exportEnabled: false,
      animationEnabled: false,
      interactivityEnabled: true,
      axisY: {
        title: "Puls [bpm]",
        suffix: "bpm"
      },
      axisX: {
        valueFormatString: "DD.MM.YYYY"
      },
      data: [{
        type: "scatter",
        click: showComment,
        xValueFormatString: "DD.MM.YYYY HH:mm",
        yValueFromatSring: "bpm",
        dataPoints: dataPoints,
      }]
    }

    const weekStartDate = moment().day("Monday").week(this.state.week).startOf('isoWeek').format("DD.MM")
    const weekEndDate = moment().day("Monday").week(this.state.week).endOf('isoWeek').format("DD.MM")
    const currentWeek = parseInt(moment().format('W'))

    return (
      <div>
        <h1 style={{color: '#ED4C67'}}>Puls</h1>
        <div className={"container mt-4 mb-2 d-flex flex-row col-11 " + (this.state.week < currentWeek ? "justify-content-between" : undefined)}>
          <button className={"btn btn-outline-primary " + (this.state.week >= currentWeek ? "mr-5" : undefined)} onClick={this.previuosWeek}>
            <i className="fa fa-angle-left" /> Poprzedni tydzień
          </button>
          <h2 style={this.state.week >= currentWeek ? {marginLeft: "10rem"} : undefined}>{weekStartDate} - {weekEndDate}</h2>
          { this.state.week < currentWeek && <button className="btn btn-outline-primary" onClick={this.nextWeek}>
                Następny tydzień <i className="fa fa-angle-right" />
          </button>}
        </div>
        <div className="container mx-auto row justify-content-center">
          { this.state.measurements.length ? 
            <>
              <div className="col-10"><CanvasJSChart options={options} /></div>
              { this.state.singleMeasure &&  
                <div className="col-8 mt-4">
                  <h4>Komentarz</h4>
                  <hr />
                  { this.state.singleMeasure.comment ? 
                    <span>{this.state.singleMeasure.comment}</span> : 
                    <h5>Brak komentarza do pomiaru</h5> }
                  <hr />
                  <textarea 
                  className="col-10 m-2"
                  value={this.state.comment || ""}
                  onChange={e => this.setState({comment: e.target.value})}
                  style={{height: "13rem", outline: "none", resize: "none"}}/>
                  <button type="button" className="btn btn-primary p-2 mb-2" onClick={postComment}>Dodaj komentarz</button> 
                </div> }
            </>
          : <h4 className="p-5">Brak pomiarów</h4>}
        </div>
      </div>
    );
  }
}

export default Pulse