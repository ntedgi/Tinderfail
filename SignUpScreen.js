import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground, Dimensions } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { createUser, loginUser } from "./services/DatabaseHandler";
import AppConfig from './AppConfig';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("./assets/back.jpg");

export default class LoginScreen1 extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      email: "genyab2@gmail.com",
      email_valid: true,
      password: "Aa123456",
      login_failed: false,
      showLoading: false
    };
  }

  async componentDidMount() {
    this.setState({ fontLoaded: true });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  async submitLoginCredentials() {
    this.setState({
      showLoading: true
    });

    const { email, password } = this.state;
    const response = await loginUser(email, password);
    const { uid } = response.user;
    AppConfig.loggedUID = uid;
    console.log(response);
    this.props.navigation.navigate("Home");
    this.setState({
      showLoading: false
    });
  }

  async _createAccountPressed() {
    const response = await createUser(this.state.email, this.state.password);
    console.log(`createAccount - response: ${JSON.stringify(response)}`);
  }

  render() {
    const { email, password, email_valid, showLoading } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          {this.state.fontLoaded ? (
            <View style={styles.loginView}>
              <View style={styles.loginTitle}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.travelText}>TRAVEL</Text>
                  <Text style={styles.plusText}>+</Text>
                </View>
                <View style={{ marginTop: -10 }}>
                  <Text style={styles.travelText}>LEISURE</Text>
                </View>
              </View>
              <View style={styles.loginInput}>
                <Input
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={email => this.setState({ email })}
                  value={email}
                  inputStyle={{ marginLeft: 10, color: "white" }}
                  keyboardAppearance='light'
                  placeholder='Email'
                  autoFocus={false}
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                  returnKeyType='next'
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => {
                    this.setState({ email_valid: this.validateEmail(email) });
                    this.passwordInput.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor='white'
                  errorStyle={{ textAlign: "center", fontSize: 12 }}
                  errorMessage={email_valid ? null : "Please enter a valid email address"}
                />
                <Input
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={password => this.setState({ password })}
                  value={password}
                  inputStyle={{ marginLeft: 10, color: "white" }}
                  secureTextEntry={true}
                  keyboardAppearance='light'
                  placeholder='Password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='default'
                  returnKeyType='done'
                  ref={input => (this.passwordInput = input)}
                  blurOnSubmit={true}
                  placeholderTextColor='white'
                />
              </View>
              <Button
                title='LOG IN'
                activeOpacity={1}
                underlayColor='transparent'
                onPress={this.submitLoginCredentials.bind(this)}
                loading={showLoading}
                loadingProps={{ size: "small", color: "white" }}
                disabled={!email_valid && password.length < 8}
                buttonStyle={{
                  height: 50,
                  width: 250,
                  backgroundColor: "gray",
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 30
                }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: "bold", color: "white" }}
              />
              <View style={styles.footerView}>
                <Text style={{ color: "grey" }}>New here?</Text>
                <Button
                  title='Create an Account'
                  clear
                  activeOpacity={0.5}
                  titleStyle={{ color: "white", fontSize: 12 }}
                  buttonStyle={{ borderRadius: 16, height: 32 }}
                  onPress={this._createAccountPressed.bind(this)}
                />
              </View>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  loginView: {
    marginTop: 150,
    backgroundColor: "transparent",
    width: 250,
    height: 400
  },
  loginTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  travelText: {
    color: "white",
    fontSize: 30
  },
  plusText: {
    color: "white",
    fontSize: 30
  },
  loginInput: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  }
});
