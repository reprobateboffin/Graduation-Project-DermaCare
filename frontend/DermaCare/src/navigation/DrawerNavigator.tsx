import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import Blogs from "../screens/SubHeaders/Blogs";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="MainTabs">
    <Drawer.Screen name="MainTabs" component={BottomTabs} />
    <Drawer.Screen name="Edit Profile" component={EditProfileScreen} />
    <Drawer.Screen name="Blogs" component={Blogs} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
