import React from "react";
import { addUserAnswers } from "./services/DatabaseHandler";
import AppConfig from "./AppConfig";

import SubmitAnswers from "./SubmitAnswers";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions
} from "react-native";
import Image from "react-native-remote-svg";
import checkIcon from "./assets/checked.svg";
import cancelIcon from "./assets/cancel.svg";
import Card from "./Card";
import img1 from "./assets/image1.jpeg";
import img2 from "./assets/image2.jpeg";
import img3 from "./assets/image3.jpeg";
import img4 from "./assets/image4.jpeg";
import img5 from "./assets/image5.jpeg";
import img7 from "./assets/image7.jpeg";
import img8 from "./assets/image8.jpeg";
import img9 from "./assets/image9.jpeg";
import img10 from "./assets/image10.jpeg";
import img11 from "./assets/image11.jpeg";
import img12 from "./assets/image12.jpeg";
import img13 from "./assets/image13.jpeg";
import img14 from "./assets/image14.jpeg";
import img15 from "./assets/image15.jpeg";
import img16 from "./assets/image16.jpeg";
import img17 from "./assets/image17.jpeg";
import img18 from "./assets/image18.jpeg";

import EmptyState from "./EmptyState";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const getCards = async () => {
  let cards = [];
  if (!cards || typeof cards != []) {
    cards = [
      { id: "1", image: img1, isActive: true, isLiked: false },
      { id: "2", image: img2, isActive: false, isLiked: false },
      { id: "3", image: img3, isActive: false, isLiked: false },
      { id: "4", image: img4, isActive: false, isLiked: false },
      { id: "5", image: img5, isActive: false, isLiked: false },
      { id: "7", image: img7, isActive: false, isLiked: false },
      { id: "8", image: img8, isActive: false, isLiked: false },
      { id: "9", image: img9, isActive: false, isLiked: false },
      { id: "10", image: img10, isActive: false, isLiked: false },
      { id: "11", image: img11, isActive: true, isLiked: false },
      { id: "12", image: img12, isActive: false, isLiked: false },
      { id: "13", image: img13, isActive: false, isLiked: false },
      { id: "14", image: img14, isActive: false, isLiked: false },
      { id: "15", image: img15, isActive: false, isLiked: false },
      { id: "16", image: img16, isActive: true, isLiked: false },
      { id: "17", image: img17, isActive: false, isLiked: false },
      { id: "18", image: img18, isActive: false, isLiked: false }
    ];
  }
  let lastItemPosition = false;
  cards.forEach((card, i) => {
    const position = new Animated.ValueXY();
    card.position = position;
    card.parentPosition = lastItemPosition;
    lastItemPosition = position;
  });
  return cards;
};

export default class Swaper extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerStyle: {
      height: 44
    }
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      cards: []
    };
  }

  async componentDidMount() {
    await this.reloadCards();
  }

  onCardSwiped = id => {
    this.setState(prevState => {
      const swipedIndex = prevState.cards.findIndex(card => card.id === id);
      const isLastIndex = swipedIndex === prevState.cards.length - 1;
      const nextIndex = swipedIndex + 1;
      const newState = { ...prevState };
      newState.cards[swipedIndex]["isActive"] = false;
      newState.isLastIndex = isLastIndex;
      if (isLastIndex) return newState;
      newState.cards[nextIndex]["isActive"] = true;
      return newState;
    });
  };

  handleNopeSelect = (dy = 0, position = false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    Animated.spring(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: dy }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));
  };

  handleLikeSelect = (dy = 0, position = false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    this.state.cards[activeIndex].isLiked = true;
    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: dy }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));
  };

  renderCards = cards => {
    return cards
      .map((card, index) => {
        return (
          <Card
            key={card.id}
            {...card}
            handleNopeSelect={this.handleNopeSelect}
            handleLikeSelect={this.handleLikeSelect}
          />
        );
      })
      .reverse();
  };

  reloadCards = async () => {
    console.log(`Getting Cards`);
    const cards = await getCards();
    this.setState({ cards, isLoading: false });
  };

  async _submitAnswersPressed() {
    console.log(`Submiting answers`);
    const answers = this.state.cards.map(card => {
      const { id, isLiked } = card;
      return { id, isLiked };
    });
    const response = await addUserAnswers(AppConfig.loggedUID, answers);
    console.log("Answers sent");
    this.props.navigation.navigate("Home");
  }

  renderEmptyState = () => {
    const selectedResult = this.state.cards.map(v => {
      return { id: v.id, alive: v.isLiked };
    });
    console.log(selectedResult)
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <SubmitAnswers navigation={this.props.navigation} selectedResult={selectedResult} />
      </View>
    );
  };

  isEmptyState = () => {
    return this.state.cards.findIndex(card => card.isActive) < 0;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardArea}>
          {this.renderCards(this.state.cards)}
        </View>
        {this.isLoading ? null : this.state.isLastIndex ? (
          this.renderEmptyState()
        ) : (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.handleLikeSelect()}
            >
              <Image source={checkIcon} style={styles.btnIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.handleNopeSelect()}
            >
              <Image source={cancelIcon} style={styles.btnIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "stretch"
  },
  cardArea: {
    flex: 10,
    marginTop: 30
  },
  btnContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1
  },
  btn: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    backgroundColor: "#efefef"
  },
  btnIcon: {
    height: 25,
    width: 25
  }
});
