import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { handleResponse, getEmotions, postEmotionsComment } from "../Shared/services"
import { datesGroupByComponent } from "../Shared/dateHelper"
import moment from "moment"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Emotions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emotionsArray: [],
      week: parseInt(moment().format('W')),
      measurements: [],
      groupedByWeek: {},
      weeksArray: [],
      groupedArray: [],
      singleMeasure: null,
      singleMeasureDataPoints: null,
      comment: undefined
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
    this.setState({week: this.state.week - 1, singleMeasure: null}, this.setMeasurments)
  }

  nextWeek = () => {
    this.setState({week: this.state.week + 1, singleMeasure: null}, this.setMeasurments)
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

    const showSingleMeasure = (e) => {
      const measureDate = moment(e.dataPoint.x).format('YYYY-MM-DD HH:mm:ss')
      const singleMeasure = this.state.measurements.find((measure) => 
        moment(measure.createdAt).format('YYYY-MM-DD HH:mm:ss') === measureDate)
      const singleMeasureDataPoints =  [
        { y: singleMeasure.fear, label: "Strach" },
        { y: singleMeasure.anger, label: "Złość" },
        { y: singleMeasure.sadness, label: "Smutek" },
        { y: singleMeasure.happiness, label: "Szczęście" },
        { y: singleMeasure.disgust, label: "Zniesmaczenie" },
        { y: singleMeasure.surprise, label: "Zaskoczenie" },
        { y: 1-singleMeasure.anger-singleMeasure.fear
          -singleMeasure.sadness-singleMeasure.happiness
          -singleMeasure.disgust-singleMeasure.surprise, label: "Obojętność" },
      ]
      singleMeasure && this.setState({ 
        comment: undefined,
        singleMeasure: singleMeasure, 
        singleMeasureDataPoints: singleMeasureDataPoints 
      })
    }

    const postComment = async(e) => {
      e.preventDefault()
      const payload = {
        emotionId: this.state.singleMeasure.id,
        userId: this.props.userInfo.userId,
        auth: this.props.userInfo.auth,
        comment: {
          comment: this.state.comment
        }
      }
      const response = await handleResponse(async () => await postEmotionsComment(payload))
      const singleMeasureDataPoints =  [
        { y: response.data.fear, label: "Strach" },
        { y: response.data.anger, label: "Złość" },
        { y: response.data.sadness, label: "Smutek" },
        { y: response.data.happiness, label: "Szczęście" },
        { y: response.data.disgust, label: "Zniesmaczenie" },
        { y: response.data.surprise, label: "Zaskoczenie" },
        { y: 1-response.data.anger-response.data.fear
          -response.data.sadness-response.data.happiness
          -response.data.disgust-response.data.surprise, label: "Obojętność" },
      ]
      response.status === 200 && this.setState({ 
        comment: undefined,
        singleMeasure: response.data, 
        singleMeasureDataPoints: singleMeasureDataPoints 
      })
    }

    const options = {
      animationEnabled: true,
      theme: "light1",
      dataPointWidth: 7,
      axisX: {
        interval: 1,
        valueFormatString: "DD.MM.YYYY"
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
        click: showSingleMeasure,
        name: "Złość",
        showInLegend: true,
        xValueFormatString: "DD.MM.YYYY HH:HH",
        yValueFormatString: "###0.00\"%\"",
        dataPoints: dataPointsAnger
      }, 
      {
        type: "stackedColumn100",
        click: showSingleMeasure,
        name: "Strach",
        showInLegend: true,
        xValueFormatString: "DD.MM.YYYY",
        yValueFormatString: "###0.00\"%\"",
        dataPoints: dataPointsFear
      }, 
      {
        type: "stackedColumn100",
        click: showSingleMeasure,
        name: "Radość",
        showInLegend: true,
        xValueFormatString: "DD.MM.YYYY",
        yValueFormatString: "###0.00\"%\"",
        dataPoints: dataPointsHappiness
      },
      {
        type: "stackedColumn100",
        click: showSingleMeasure,
        name: "Smutek",
        showInLegend: true,
        xValueFormatString: "DD.MM.YYYY",
        yValueFormatString: "###0.00\"%\"",
        dataPoints: dataPointsSadness
      },
      {
        type: "stackedColumn100",
        click: showSingleMeasure,
        name: "Zaskoczenie",
        showInLegend: true,
        xValueFormatString: "DD.MM.YYYY",
        yValueFormatString: "###0.00\"%\"",
        dataPoints: dataPointsSurprise
      },
      {
        type: "stackedColumn100",
        click: showSingleMeasure,
        name: "Zniesmaczenie",
        showInLegend: true,
        xValueFormatString: "DD.MM.YYYY",
        yValueFormatString: "###0.00\"%\"",
        dataPoints: dataPointsDisgust
      },
      {
        type: "stackedColumn100",
        click: showSingleMeasure,
        name: "Obojętność",
        showInLegend: true,
        xValueFormatString: "DD.MM.YYYY",
        yValueFormatString: "###0.00\"%\"",
        dataPoints: dataPointsIndifference
      }
    ]
  }

  const optionsPieChart = {
    theme: "light2",
    exportEnabled: false,
    animationEnabled: false,
    title: {
      text: " "
    },
    data: [{
      type: "pie",
      indexLabelFontSize: 18,
      indexLabel: "{label} - {y}",
      yValueFormatString: "###0.00\"%\"",
      dataPoints: this.state.singleMeasureDataPoints
    }]
  }

  const weekStartDate = moment().day("Monday").week(this.state.week).startOf('isoWeek').format("DD.MM")
  const weekEndDate = moment().day("Monday").week(this.state.week).endOf('isoWeek').format("DD.MM")
  const currentWeek = parseInt(moment().format('W'))

  return (
    <div>
      <h1 style={{color: '#5f27cd'}}>Emocje</h1>            
      <div className={"container mt-4 mb-2 d-flex flex-row col-11 " + (this.state.week < currentWeek ? "justify-content-between" : undefined)}>
        <button className={"btn btn-outline-primary " + (this.state.week >= currentWeek ? "mr-5" : undefined)} onClick={this.previuosWeek}>
          <i className="fa fa-angle-left" /> Poprzedni tydzień
        </button>
        <h2 className={this.state.week >= currentWeek ? "ml-5" : undefined}>{weekStartDate} - {weekEndDate}</h2>
        { this.state.week < currentWeek && <button className="btn btn-outline-primary" onClick={this.nextWeek}>
              Następny tydzień <i className="fa fa-angle-right" />
        </button>}
      </div>
      <div className="mx-auto">
      { this.state.measurements.length && this.state.singleMeasure ? 
          <>
            <div className="d-inline-block col-10"><CanvasJSChart options={options} /></div>
            <div className="d-inline-block col-xs-10 col-sm-10 col-md-10 col-lg-7 col-xl-6"><CanvasJSChart options={optionsPieChart} /></div>
            <div className="d-inline-block col-xs-10 col-sm-10 col-md-10 col-lg-3 col-xl-4 h-100 align-top">
              <h4>Komentarz</h4>
              <hr />
              { this.state.singleMeasure.comment ? 
                <span>{this.state.singleMeasure.comment}</span> : 
                <h5>Brak komentarza do pomiaru</h5> }
              <hr />
              <textarea 
                className="col-12 m-2"
                value={this.state.comment || ""}
                onChange={e => this.setState({comment: e.target.value})}
                style={{height: "13rem", outline: "none", resize: "none"}}/>
              <button type="button" className="btn btn-primary p-2 mb-2" onClick={postComment}>Dodaj komentarz</button>
            </div>
            </>
          : (this.state.measurements.length 
            ? <div className="d-inline-block col-9"><CanvasJSChart options={options} /></div> 
            : <h4>Brak pomiarów</h4>)}
      </div>
    </div>
  );
  }
}

export default Emotions