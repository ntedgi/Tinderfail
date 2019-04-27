import React from 'react';
import Swaper from './Swaper';
import ScoreTable from './ScoreTable'
import { SIGNUP,SWAPPER,TABLE} from "./StepsConsts"


export default class App extends React.Component {
    constructor() {
      super()    
      this.state = {
            step : SIGNUP
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
        else return (<ScoreTable/>)  
    }   
}
