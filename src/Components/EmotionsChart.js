import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { handleResponse, getEmotions } from "../Shared/services"
import { datesGroupByComponent } from "../Shared/dateHelper"
import moment from "moment"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class EmotionsChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emotionsArray: [],
      week: parseInt(moment().format('W')),
      measurements: [],
      groupedByWeek: {},
      weeksArray: [],
      groupedArray: []
    }
  }

  async componentDidMount() {
    const emotionsArray = await handleResponse(async () => await getEmotions(this.props.userInfo))
    this.setState({ 
        emotionsArray: emotionsArray, 
        groupedByWeek: datesGroupByComponent(emotionsArray , 'W'),
        weeksArray: Object.keys(datesGroupByComponent(emotionsArray , 'W')),
        groupedArray: Object.entries(datesGroupByComponent(emotionsArray , 'W'))
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
    const dataPointsAnger = this.state.measurements.map(result => ({
      x: new Date(result.createdAt),
      y: result.anger
    }))

    const dataPointsFear = this.state.measurements.map(result => ({
      x: new Date(result.createdAt),
      y: result.fear
    }))

    const dataPointsHappiness = this.state.measurements.map(result => ({
      x: new Date(result.createdAt),
      y: result.happiness
    }))

    const dataPointsSadness = this.state.measurements.map(result => ({
      x: new Date(result.createdAt),
      y: result.sadness
    }))

    const dataPointsSurprise = this.state.measurements.map(result => ({
      x: new Date(result.createdAt),
      y: result.surprise
    }))

    const dataPointsDisgust = this.state.measurements.map(result => ({
      x: new Date(result.createdAt),
      y: result.disgust
    }))

    const dataPointsIndifference = this.state.measurements.map(result => ({
      x: new Date(result.createdAt),
      y: 1 - result.disgust - result.happiness - result.sadness - result.fear - result.anger - result.surprise
    }))

    const options = {
      animationEnabled: true,
      theme: "light1",
      dataPointWidth: 7,
      width: '700',
      axisX: {
        interval: 1,
        valueFormatString: "DD MM YYYY"
      },
      axisY: {
        //suffix: "%"
      },
      toolTip: {
        shared: true
      },
      legend: {
        reversed: true,
        verticalAlign: "center",
        horizontalAlign: "right"
      },
	    data: [{
        type: "stackedColumn100",
        name: "Złość",
        showInLegend: true,
        xValueFormatString: "DD MM YYYY HH:HH",
        //yValueFormatString: "#,##0\"%\"",
        dataPoints: dataPointsAnger
      }, 
      {
        type: "stackedColumn100",
        name: "Strach",
        showInLegend: true,
        xValueFormatString: "DD MM YYYY",
        //yValueFormatString: "#,##0\"%\"",
        dataPoints: dataPointsFear
      }, 
      {
        type: "stackedColumn100",
        name: "Radość",
        showInLegend: true,
        xValueFormatString: "DD MM YYYY",
        //yValueFormatString: "#,##0\"%\"",
        dataPoints: dataPointsHappiness
      },
      {
        type: "stackedColumn100",
        name: "Smutek",
        showInLegend: true,
        xValueFormatString: "DD MM YYYY",
        //yValueFormatString: "#,##0\"%\"",
        dataPoints: dataPointsSadness
      },
      {
        type: "stackedColumn100",
        name: "Zaskoczenie",
        showInLegend: true,
        xValueFormatString: "DD MM YYYY",
        //yValueFormatString: "#,##0\"%\"",
        dataPoints: dataPointsSurprise
      },
      {
        type: "stackedColumn100",
        name: "Zniesmaczenie",
        showInLegend: true,
        xValueFormatString: "DD MM YYYY",
        //yValueFormatString: "#,##0\"%\"",
        dataPoints: dataPointsDisgust
      },
      {
        type: "stackedColumn100",
        name: "Obojętność",
        showInLegend: true,
        xValueFormatString: "DD MM YYYY",
        //ValueFormatString: "#,##0\"%\"",
        dataPoints: dataPointsIndifference
      }
    ]
  }

  const weekStartDate = moment().day("Monday").week(this.state.week).startOf('isoWeek').format("DD.MM")
  const weekEndDate = moment().day("Monday").week(this.state.week).endOf('isoWeek').format("DD.MM")
  const currentWeek = parseInt(moment().format('W'))
  return (
    <>
      <div className={"container mt-4 mb-2 d-flex flex-row " + (this.state.week < currentWeek && "justify-content-between")} style={{width: '700px'}}>
        <button className={"btn btn-outline-primary " + (this.state.week >= currentWeek && "mr-5")} onClick={this.previuosWeek}>
          <i className="fa fa-angle-left" /> Poprzedni tydzień
        </button>
        <h2 className={" "+ (this.state.week >= currentWeek && "ml-5")}>{weekStartDate} - {weekEndDate}</h2>
        { this.state.week < currentWeek && <button className="btn btn-outline-primary" onClick={this.nextWeek}>
              Następny tydzień <i className="fa fa-angle-right" />
        </button>}
      </div>
      <div className="container mx-auto" style={{width: '700px'}}>
      { this.state.measurements.length ? 
        <CanvasJSChart options={options} /> 
        : <h4>Brak pomiarów</h4>}
      </div>
    </>
  );
  }
}

export default EmotionsChart