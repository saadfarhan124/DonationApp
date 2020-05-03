import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoadingScreen from "../screens/shared/LoadingScreen";
import MainScreen from "../screens/shared/MainScreenComponent";
import SignUpWithEmail from "../screens/shared/SignUpWithEmail";
import BottomNavigator from "../screens/Helper/BottomNavigator";
import { PINK, GRAY, GREEN } from "../colors";

const screens = {
  Splash: {
    screen: LoadingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: MainScreen,
    navigationOptions: {
      // headerLeft: () => null,
      // title: "Donate",
      // headerTitleAlign: "center",
      headerShown: false,
    },
  },
  SignUpWithEmail: {
    screen: SignUpWithEmail,
    navigationOptions: {
      // headerLeft: () => null,
      title: "Email Registration",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: GREEN,
      headerTitleStyle: {},

      // headerShown: false,
    },
  },
  Helper: {
    screen: BottomNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
};
const HomeNavigation = createStackNavigator(screens, {});

export default createAppContainer(HomeNavigation);
