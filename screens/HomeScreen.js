import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';

import NavOptions from '../components/NavOptions';
import NavFavorites from '../components/NavFavorites';

const HomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView className='bg-white h-full'>
			<View className='p-5'>
				<Image
					source={{ uri: 'https://links.papareact.com/gzs' }}
					style={{ width: 100, height: 100, resizeMode: 'contain' }}
				/>

				<GooglePlacesAutocomplete
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					placeholder='Where from?'
					nearbyPlacesAPI='GooglePlacesSearch'
					debounce={400}
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: 'en',
					}}
					minLength={2}
					enablePoweredByContainer={false}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);

						dispatch(setDestination(null));
					}}
					fetchDetails={true}
					returnKeyType={'search'}
				/>

				<NavOptions />
				<NavFavorites />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
