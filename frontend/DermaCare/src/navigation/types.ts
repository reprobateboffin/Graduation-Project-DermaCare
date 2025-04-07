import { Event } from '../store/useCalendarStore';

export type RootStackParamList = {
  Welcome: undefined;
  Loading: undefined;
  MainTabs: undefined;
  EditProfile: undefined;
  RegisterPage: undefined;
  RegisterPage2: undefined;
  RegisterVerification: undefined;
  VerificationCode: undefined;
  WantToRegister: undefined;
  BookmarkedBlogs: undefined;
  BlogDetails: {title: string, image_url: string, subText: string, body: string};
  DashboardScreen: undefined;
  DashboardEventsScreen: { selectedDate?: string };
  HomeScreen: undefined;
  ProvideInformation: undefined;
  WeFoundYou: undefined;
  VerificationCodeLogin: undefined;
  LoginVerification: undefined;
  LoginPage: undefined;
  LoginSwitchVerification: undefined;
  AIVisitsLanding: undefined;
  AIVisitsDashboard: undefined;
  AIVisitsPage: undefined;
  AIVisitPatient: { id: string };
  EventDetail: { event: Event };
  YearlyCalendar: undefined;
  Cart: {healthCardNumber:string};
  EnterCreditCardScreen: {healthCardNumber: string;
    serialNumber: string;
    price: string;
    name: string;
    quantity: string;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Profile: undefined;
  Settings: undefined;
}; 