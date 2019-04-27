import React from "react";
import TableComponent from "./TableComponent";
export default class ScoreTable extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerStyle: {
      height: 44
    }
  }
  render() {
    return <TableComponent />;
  }
}
