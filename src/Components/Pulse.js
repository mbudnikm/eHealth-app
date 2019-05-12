import React, { Component } from 'react';
import { handleResponse, getPulse } from "../Shared/services"
import PulseMonthChart from './PulseMonthChart'

class Pulse extends Component  {
    constructor(props) {
        super(props)

        this.state = {
            comment: null,
        }
    }
    
    async componentDidMount () {
        const response = await handleResponse(async () => await getPulse(this.props.userInfo))
        console.log(response)
    }

    render() {
        return (
            <div>
                <h1 style={{color: '#ED4C67'}}>Puls</h1>
                <PulseMonthChart userInfo={this.props.userInfo} />
            </div>
        )
    }
}

export default Pulse;