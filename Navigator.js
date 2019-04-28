import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from "./Home";
import ScoreTable from "./ScoreTable";
import Swaper from "./Swaper";
import SignUpScreen from './SignUpScreen';
import SubmitAnswers from './SubmitAnswers';
const MainNavigator = createStackNavigator({
  Home: {screen: Home},    
  SubmitAnswers:{screen:SubmitAnswers},
  SignUp: {screen: SignUpScreen},
  Score: {screen: ScoreTable},
  Swapper: {screen: Swaper}
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;