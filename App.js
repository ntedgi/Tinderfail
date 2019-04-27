import React from "react";
import Home from "./Home";

import { HOME, SWAPPER, TABLE } from "./StepsConsts";
import ScoreTable from "./ScoreTable";
import Swaper from "./Swaper";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      step: HOME
    };
  }

  moveToQuestions = () => {
    this.setState({ step: TABLE });
  };
  moveToScrore = () => {
    this.setState({ step: SWAPPER });
  };
  render() {
    const { step } = this.state;
    if (step === HOME)
      return (
        <Home
          moveToQuestions={this.moveToQuestions}
          moveToScrore={this.moveToScrore}
        />
      );
    if (step === SWAPPER) return <Swaper />;
    else return <ScoreTable />;
  }
}
