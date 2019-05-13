import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { handleResponse, getEmotions } from "../Shared/services"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class EmotionsChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emotionsArray: [],
    }
  }

  async componentDidMount() {
    const emotionsArray = await handleResponse(async () => await getEmotions(this.props.userInfo))
    this.setState({ emotionsArray: emotionsArray })
  };

  render() {
    const dataPointsAnger = this.state.emotionsArray.map(result => ({
      x: new Date(result.createdAt),
      y: result.anger
    })).filter(el => el.x.toString().includes('May'))

    const dataPointsFear = this.state.emotionsArray.map(result => ({
      x: new Date(result.createdAt),
      y: result.fear
    })).filter(el => el.x.toString().includes('May'))

    const dataPointsHappiness = this.state.emotionsArray.map(result => ({
      x: new Date(result.createdAt),
      y: result.happiness
    })).filter(el => el.x.toString().includes('May'))

    const dataPointsSadness = this.state.emotionsArray.map(result => ({
      x: new Date(result.createdAt),
      y: result.sadness
    })).filter(el => el.x.toString().includes('May'))

    const dataPointsSurprise = this.state.emotionsArray.map(result => ({
      x: new Date(result.createdAt),
      y: result.surprise
    })).filter(el => el.x.toString().includes('May'))

    const dataPointsDisgust = this.state.emotionsArray.map(result => ({
      x: new Date(result.createdAt),
      y: result.disgust
    })).filter(el => el.x.toString().includes('May'))

    const dataPointsIndifference = this.state.emotionsArray.map(result => ({
      x: new Date(result.createdAt),
      y: 1 - result.disgust - result.happiness - result.sadness - result.fear - result.anger - result.surprise
    })).filter(el => el.x.toString().includes('May'))

    const options = {
      animationEnabled: true,
      theme: "dark2",
      dataPointWidth: 3,
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

  return (
    <div className="container mx-auto" style={{width: '700px'}}>
    { this.state.emotionsArray.length ? <CanvasJSChart options={options} /> : <h4>Brak pomiarów</h4>}
    </div>
  );

    /*
    
    return (<h1>Coś tam</h1>)
  }*/
    /*const dataPoints = this.state.pulseMeasure.map(measurement => ({
      x: new Date(measurement.createdAt),
      y: measurement.pulse
    })).filter(el => el.x.toString().includes('May'))


    const options = {
      theme: "dark2",
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
        xValueFormatString: "DD MM YYYY",
        yValueFromatSring: "bpm",
        dataPoints: dataPoints
      }]
    }

    return (
      <div className="container mx-auto" style={{width: '700px'}}>
      { this.state.emotionsArray.length ? <CanvasJSChart options={options} /> : <h4>Brak pomiarów</h4>}
      </div>
    );*/
  }
}

export default EmotionsChart