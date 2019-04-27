import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import Image from "react-native-remote-svg";
import background from "./assets/home.png";
import header from "./assets/homeHeader.svg";
import header1 from "./assets/subheader.svg";
import header2 from "./assets/subheader2.svg";
import header3 from "./assets/subheader3.svg";
import header4 from "./assets/whatdead.svg";

export default class home extends React.Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={background} style={{ width: "100%", height: "100%" }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={header} style={styles.header} />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => navigate("Swapper")}>
              <Text style={styles.btn}>Guess The Throne</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("Score")}>
              <Text style={styles.btn}>See The Deads</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    width: 500,
    height: 75
  },
  subheader: {
    width: 250,
    height: 75
  },
  caption: {
    marginTop: 60,
    fontWeight: "400",
    fontSize: 14,
    color: "#a5a5a5",
    padding: 8,
    letterSpacing: 0.5
  },
  btnContainer: {
    marginTop: 300,
    top: 0,
    bottom: 0
  },
  btn: {
    width: 300,
    fontSize: 25,
    fontWeight: "800",
    borderWidth: 0.5,
    borderColor: "#a5a5a5",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    color: "white",
    margin: 8
  }
});
