import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// 하단 탭 화면
import HomeScreen from '../screens/home/HomeScreen';
import ActivityScreen from '../screens/activity/ActivityScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

// 상단 메뉴 화면
import MeetingHomeScreen from '../screens/meeting/MeetingHomeScreen';
import MeetingMapScreen from '../screens/meeting/MeetingMapScreen';
import CommunityScreen from '../screens/community/CommunityScreen';
import GroupBuyScreen from '../screens/groupbuy/GroupBuyScreen';
import HobbyScreen from '../screens/hobby/HobbyScreen';
import HospitalScreen from '../screens/hospital/HospitalScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 하단 탭 네비게이터
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: '홈',
        }}
      />
      <Tab.Screen 
        name="Activity" 
        component={ActivityScreen} 
        options={{ 
          title: '활동내역',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          title: '내정보',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: '설정',
        }}
      />
    </Tab.Navigator>
  );
}

// 메인 스택 네비게이터
export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={BottomTabNavigator} />
      <Stack.Screen name="MeetingHome" component={MeetingHomeScreen} />
      <Stack.Screen name="MeetingMap" component={MeetingMapScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="GroupBuy" component={GroupBuyScreen} />
      <Stack.Screen name="Hobby" component={HobbyScreen} />
      <Stack.Screen name="Hospital" component={HospitalScreen} />
    </Stack.Navigator>
  );
}


