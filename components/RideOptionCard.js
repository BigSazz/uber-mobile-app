import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import React, { useState } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
	{
		id: 'Uber-X-123',
		title: 'UberX',
		multiplier: 1,
		image: 'https://links.papareact.com/3pn',
	},
	{
		id: 'Uber-XL-456',
		title: 'Uber XL',
		multiplier: 1.2,
		image: 'https://links.papareact.com/5w8',
	},
	{
		id: 'Uber-LUX-789',
		title: 'Uber LUX',
		multiplier: 1.8,
		image: 'https://links.papareact.com/7pf',
	},
];

const SURGE_CHARGE_RATE = 1.2;

const RideOptionCard = () => {
	const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInfo = useSelector(selectTravelTimeInformation);

	// convert the travel text from miles to kilometers
	const travelTimeInKm = Math.round(
		parseFloat(travelTimeInfo?.distance?.text) * 1.609
	);

	return (
		<SafeAreaView className='bg-white flex-1'>
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate('NavigateCard')}
					className='absolute z-50 top-3 left-5 p-2 rounded-full'
				>
					<Icon name='chevron-left' type='fontawesome' />
				</TouchableOpacity>
				<Text className='text-center py-5 text-xl font-semibold'>
					Select a Ride - ({travelTimeInKm} km)
				</Text>
			</View>

			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({
					item: { id, title, multiplier, image },
					item,
				}) => (
					<TouchableOpacity
						onPress={() => setSelected(item)}
						className={`${
							selected?.id === id && 'bg-gray-200'
						} flex-row justify-between items-center px-10`}
					>
						<Image
							source={{ uri: image }}
							style={{
								width: 100,
								height: 100,
								resizeMode: 'contain',
							}}
						/>
						<View className='-ml-6'>
							<Text className='text-xl font-semibold'>
								{title}
							</Text>
							<Text>{travelTimeInfo?.duration?.text}</Text>
						</View>
						<Text className='text-lg'>
							{new Intl.NumberFormat('en-gb', {
								style: 'currency',
								currency: 'NGN',
							}).format(
								Math.ceil(
									travelTimeInfo?.duration?.value *
										SURGE_CHARGE_RATE *
										multiplier
								)
							)}
						</Text>
					</TouchableOpacity>
				)}
			/>

			{selected && (
				<View className='mt-auto border-t border-gray-200'>
					<TouchableOpacity className='bg-black py-3 m-3'>
						<Text className='text-center text-white text-xl'>
							Confirm {selected?.title} Ride
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
};

export default RideOptionCard;
