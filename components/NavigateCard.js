import {
	View,
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from '@rneui/base';

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	//calculate time of day and greet user
	const timeOfDay = () => {
		const date = new Date();
		const hours = date.getHours();
		if (hours < 12) {
			return 'Good Morning';
		} else if (hours >= 12 && hours <= 17) {
			return 'Good Afternoon';
		} else {
			return 'Good Evening';
		}
	};

	return (
		<SafeAreaView className='bg-white flex-1'>
			<Text className='text-center py-5 text-xl font-semibold'>{`${timeOfDay()}, Osaze`}</Text>
			<View className='border-t border-gray-200 flex-shrink'>
				<View>
					<GooglePlacesAutocomplete
						placeholder='Where to?'
						nearbyPlacesAPI='GooglePlacesSearch'
						debounce={400}
						styles={toInputBoxStyles}
						fetchDetails={true}
						returnKeyType={'search'}
						enablePoweredByContainer={false}
						minLength={2}
						query={{
							key: GOOGLE_MAPS_APIKEY,
							language: 'en',
						}}
						onPress={(data, details = null) => {
							dispatch(
								setDestination({
									location: details.geometry.location,
									description: data.description,
								})
							);
							navigation.navigate('RideOptionCard');
						}}
					/>
				</View>

				<NavFavorites />
			</View>

			<View className='flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100'>
				<TouchableOpacity
					onPress={() => navigation.navigate('RideOptionCard')}
					className='flex flex-row bg-black w-28 px-4 py-3 rounded-full space-x-3 items-center justify-center'
				>
					<Icon
						name='car'
						type='font-awesome'
						color='white'
						size={16}
					/>
					<Text className='text-center text-white'>Rides</Text>
				</TouchableOpacity>
				<TouchableOpacity className='flex flex-row bg-gray-100 w-28 px-4 py-3 rounded-full space-x-3 items-center justify-center'>
					<Icon
						name='fast-food-outline'
						type='ionicon'
						color='black'
						size={16}
					/>
					<Text className='text-center text-black'>Rides</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingTop: 20,
		paddingBottom: 0,
		flex: 0,
	},
	textInput: {
		backgroundColor: '#DDDDDF',
		borderRadius: 0,
		fontSize: 18,
	},
	textInputContainer: {
		paddingHorizontal: 20,
		paddingVertical: 0,
	},
});
