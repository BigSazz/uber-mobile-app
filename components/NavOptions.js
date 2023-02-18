import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
	{
		id: '123',
		title: 'Get a ride',
		image: 'https://links.papareact.com/3pn',
		screen: 'MapScreen',
	},
	{
		id: '456',
		title: 'Order food',
		image: 'https://links.papareact.com/28w',
		screen: 'EatsScreen',
	},
];

const NavOptions = () => {
	const navigation = useNavigation();
	const origin = useSelector(selectOrigin);

	return (
		<FlatList
			data={data}
			horizontal
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<TouchableOpacity
					onPress={() => navigation.navigate(item?.screen)}
					className='p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40'
					disabled={!origin}
				>
					<View className={`${!origin && 'opacity-40'}`}>
						<Image
							source={{ uri: item.image }}
							style={{
								width: 120,
								height: 120,
								resizeMode: 'contain',
							}}
						/>
						<Text className='mt-2 text-lg font-semibold'>
							{item.title}
						</Text>
						<View className='w-10 h-10 bg-black rounded-full justify-center items-center p-2 mt-4'>
							<Icon
								type='antdesign'
								name='arrowright'
								color='white'
							/>
						</View>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavOptions;
