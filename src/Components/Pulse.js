import React, { Component } from 'react';
import { handleResponse, getPulse } from "../Shared/services"

class Pulse extends Component  {
    constructor(props) {
        super(props)
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
            </div>
        )
    }
}

export default Pulse;