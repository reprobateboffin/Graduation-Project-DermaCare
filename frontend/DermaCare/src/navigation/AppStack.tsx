import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AIVisitsLanding from "../screens/ai-visits/Landing";
import DrawerNavigator from "./DrawerNavigator";
import AIVisitsDashboard from "../screens/ai-visits/Dashboard";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import EventDetailScreen from "../screens/dashboard/EventDetailScreen";
import AIVisitPatient from "../screens/ai-visits/VisitPatient";
import YearlyCalendarScreen from "../screens/dashboard/YearlyCalendarScreen";


const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
    <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    <Stack.Screen name="AIVisitsLanding" component={AIVisitsLanding} />
    <Stack.Screen name="AIVisitsDashboard" component={AIVisitsDashboard} />
    {/* <Stack.Screen name="AIVisitPatient" component={AIVisitPatient} /> */}
    <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    <Stack.Screen name="YearlyCalendar" component={YearlyCalendarScreen} />
  </Stack.Navigator>
);

export default AppStack;
