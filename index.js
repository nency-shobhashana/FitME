import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Drawers from './components/admin/Drawers';
import AdminChat from './components/admin/AdminChat'
import adminCategoryList from './components/admin/CategoryList';
import adminCategory from './components/admin/Category';
import adminProductList from './components/admin/ProductList';
import adminProduct from './components/admin/Product';
import adminUserInfo from './components/admin/UserInfo';
import adminProfile from './components/admin/Profile';
import UserDetail from './components/UserDetail';
import HomeScreen from './components/HomeScreen';
import Message from './components/Chat';
import Progress from './components/Progress';
import Plan from './components/Plan';
import Me from './components/Me';
import ReceipeScreen from './components/ReceipeScreen';
import ProductDetail from './components/ProductDetail';
import Bmi from './components/Bmi';
import UpdateMe from './components/UpdateMe';
import StripeApp from './components/StripeApp';
import AddadminInfo from './components/admin/AddadminInfo';
import UpdateProfile from './components/admin/UpdateProfile';
import SplashScreen from './components/SplashScreen';
import About from './components/aboutDietician';


const Navigator = createStackNavigator({
  
  SplashScreen: { screen: SplashScreen, navigationOptions: {headerShown: false}},
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Home: { screen: HomeScreen, navigationOptions: {headerShown: false}  },
  Bmi : { screen: Bmi},
  Dashboard: { screen: Drawers, navigationOptions: {headerShown: false}},
  adminChat: {screen: AdminChat},
  adminCategoryList: { screen: adminCategoryList },
  adminCategory: { screen: adminCategory },
  adminProductList: { screen: adminProductList },
  adminProduct: { screen: adminProduct },
  adminUserInfo: { screen: adminUserInfo },
  adminProfile: {screen: adminProfile},
  UserDetail: { screen: UserDetail},
  Message: { screen: Message},
  Progress: { screen: Progress},
  Plan: { screen: Plan},
  Me: { screen: Me},
  UpdateMe: { screen: UpdateMe},
  ReceipeScreen: { screen: ReceipeScreen},
  ProductDetail: { screen: ProductDetail },
  Payment: { screen: StripeApp },
  AdminInfo: { screen: AddadminInfo },
  UpdateProfile: { screen: UpdateProfile },
  About: { screen: About }
},

{
    // Specifing Initial Screen
    initalRoute: 'SplashScreen'
}

);

const App = createAppContainer(Navigator);

export default App;