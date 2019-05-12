import React from 'react';
import Instruction from './Instruction'
import Pulse from './Pulse'
import Emotions from './Emotions'

const Content = (props) => {
    return (
        <div className="tab-content content-color" id="tabContent" style={{height: 'auto'}}>
          <div className="tab-pane fade show active" id="instruction" role="tabpanel" aria-labelledby="instruction-tab">
            <Instruction />
          </div>
          <div className="tab-pane fade" id="pulse" role="tabpanel" aria-labelledby="pulse-tab">
            <Pulse userInfo={props.userInfo} />
          </div>
          <div className="tab-pane fade" id="emotions" role="tabpanel" aria-labelledby="emotions-tab">
            <Emotions userInfo={props.userInfo} />
          </div>
        </div>
    )
}

export default Content;