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
        const payload = {
            userId: this.props.userId,
            auth: this.props.auth
        }
        const response = await handleResponse(async () => await getPulse(payload))
        console.log(response)
    }

    render() {
        return (
            <div>
                <h1 style={{color: '#ED4C67'}}>Puls</h1>
                <PulseMonthChart auth={this.props.auth} userId={this.props.userId} />
            </div>
        )
    }
}

export default Pulse;