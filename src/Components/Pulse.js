import React, { Component } from 'react';
//import { handleResponse, getPulse } from "../Shared/services"
import PulseChart from "./PulseChart"
import "../App.css"

class Pulse extends Component  {
    constructor(props) {
        super(props)

        this.state = {
            comment: null,
            pulseMeasure: []
        }
    }
    
    /*async componentDidMount () {
        const response = await handleResponse(async () => await getPulse(this.props.userInfo))
        console.log(response)
        response.length && this.setState({ pulseMeasure: response })
    }*/

    render() {
        return (
            <>
                <h1 style={{color: '#ED4C67'}}>Puls</h1>
                <div className="pulse-chart">
                <div className="container">
                    <PulseChart userInfo={this.props.userInfo} />
                </div>
                </div>
            </>
        )
    }
}

export default Pulse;