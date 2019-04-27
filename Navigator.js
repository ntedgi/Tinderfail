import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from "./Home";
import ScoreTable from "./ScoreTable";
import Swaper from "./Swaper";
import SignUpScreen from './SignUpScreen';

const MainNavigator = createStackNavigator({
  SignUp: {screen: SignUpScreen},
  Home: {screen: Home},
  Score: {screen: ScoreTable},
  Swapper: {screen: Swaper}
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;