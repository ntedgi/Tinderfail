import Swaper from './Swaper';
import React from 'react';
import { SIGNUP,SWAPPER,TABLE} from "./StepsConsts"


export default class App extends React.Component {
    constructor() {
      super()    
      this.state = {
            step : SIGNUP,
            stepId : 0
      };
    }
    getNextStep = (currentStep )=>{
        if(currentStep === SIGNUP ) return SWAPPER;
        if(currentStep === SWAPPER ) return TABLE;
        return TABLE;

    }
    onStepFinish = () => {
        let nextStep = getNextStep(this.state.step)
        this.setState({step :nextStep} )
    }

    render(){
        if(this.state.step===SIGNUP) return <Swaper onStepFinish={this.onStepFinish}/>    
        return <div>"ff"</div>    
    }   
}
