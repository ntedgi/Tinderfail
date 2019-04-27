import React, { Component } from "react";
import {
  Image as RNImage,
  Platform,
  StyleSheet,
  View,ImageBackground
} from "react-native";
import Table from "./Table";
import DataFactory from "./DataFactory";
import title from "./assets/kings.png";
import backgroundImage from "./assets/back.jpg";


const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 140
  },
  {
    title: "Score",
    dataIndex: "score"
  }
];

class TableComponent extends Component {
  render() {
    let dataSource = DataFactory.generate().data;
    return (
      <ImageBackground
      source={backgroundImage}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <RNImage style={styles.cardImg} source={title} />
        <Table
          height={600}
          columnWidth={180}
          columns={columns}
          dataSource={dataSource}
        />
      </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        alignItems: "center"
      }
    })
  },
  cardImg: {
    margin: 70,
    width:200 ,
    height:40
  }
});

export default TableComponent;
