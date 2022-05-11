import {  createAppContainer} from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import Home from "../screens/Home";
import ChooseTime from "../screens/times/ChooseTime";
import Login from "../screens/connect/Login";
import NewUser from "../screens/connect/NewUser";
import Colors from "../constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButtons from "../components/HeaderButton";
import Halacha from "../screens/times/Halacha";
import TefilotTimes from "../screens/times/TefilotTimes";
import { createDrawerNavigator } from "react-navigation-drawer";
import DailyLearning from "../screens/DailyLearning";
import Chats from "../screens/forums/Chats";
import NotesBoard from "../screens/NotesBoard"
import Waiting from "../screens/connect/Waiting";
import Admin from "../screens/admin/Admin";
import Requests from "../screens/admin/Requests";
import Compass from "../screens/Compass";
import PayMenu from "../screens/payments/PayMenu";
import PaySeat from "../screens/payments/PaySeat";
import NavigateToSynagogue from "../screens/NavigateToSynagogue";
import Yzkor from "../screens/Yzkor";

const ScreensNavigator = createStackNavigator({
    LoginScreen: Login,
    HomeScreen: Home,
    WaitingScreen: Waiting,
    AdminScreen: Admin,
    TimesScreen: ChooseTime,
    NewUserScreen: NewUser,
    HalachaScreen: Halacha,
    TefilotTimesScreen: TefilotTimes,
    DailyLearningScreen: DailyLearning,
    NotesBoardScreen: NotesBoard,
    ChatsScreen: Chats,
    RequestsScreen: Requests,
    CompassScreen: Compass,
    PayMenuScreen: PayMenu,
    PaySeatScreen: PaySeat,
    NavigateToSynagogueScreen: NavigateToSynagogue,
    YzkorScreen: Yzkor,
    },
    { 
        defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.myBlue,
            height: 50,
          },
          headerTintColor: 'white',
          
          
    }

});


const MainNavigator = createDrawerNavigator({
    HomeNavigation: {
        screen: ScreensNavigator,
        navigationOptions: {
            drawerLabel: 'מסך ראשי',
        }
    },
    // Logoff: ScreensNavigator.Login, //{
        
    //     screen: ScreensNavigator,
    //     navigationOptions: {
    //         drawerLabel: 'התנתק',
    //     }
    // }

});



//export default MainNavigator;
export default createAppContainer(MainNavigator);