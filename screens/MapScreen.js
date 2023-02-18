import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionCard from '../components/RideOptionCard';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
	const Stack = createStackNavigator();
	const navigation = useNavigation();

	return (
		<View>
			<TouchableOpacity
				onPress={() => navigation.navigate('HomeScreen')}
				className='absolute top-16 left-8 bg-gray-100 z-50 p-3 rounded-full shadow-lg'
			>
				<Icon name='home' />
			</TouchableOpacity>

			<View className='h-1/2'>
				<Map />
			</View>
			<View className='h-1/2'>
				<Stack.Navigator>
					<Stack.Screen
						name='NavigateCard'
						component={NavigateCard}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='RideOptionCard'
						component={RideOptionCard}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</View>
		</View>
	);
};

export default MapScreen;
