import React, { Component } from 'react';
import { handleResponse, getEmotions } from "../Shared/services"

class Emotions extends Component  {
    constructor(props) {
        super(props)
    }
    
    async componentDidMount () {
        const response = await handleResponse(async () => await getEmotions(this.props.userInfo))
        console.log(response)
    }

    render() {
        return (
            <div>
                <h1 style={{color: '#5f27cd'}}>Emocje</h1>
            </div>
        )
    }
}

export default Emotions;
