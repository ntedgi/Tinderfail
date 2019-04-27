import React from "react";
import Swaper from "./Swaper";
import Home from "./Home";

import { SIGNUP, SWAPPER, TABLE } from "./StepsConsts";
import ScoreTable from "./ScoreTable";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      step: SWAPPER
    };
  }
  getNextStep = currentStep => {
    if (currentStep === SIGNUP) return SWAPPER;
    if (currentStep === SWAPPER) return TABLE;
    return TABLE;
  };
  onStepFinish = () => {
    let nextStep = this.getNextStep(this.state.step);
    this.setState({ step: nextStep });
  };

  render() {
    // if(this.state.step===SWAPPER) return <Swaper onStepFinish={this.onStepFinish}/>
    // return <Home />;
    return <ScoreTable />;

  }
}
