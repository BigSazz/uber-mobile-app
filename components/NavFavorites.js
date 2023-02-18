import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const data = [
	{
		id: '123',
		icon: 'home',
		location: 'Home',
		destination: 'Code Street, London, UK',
	},
	{
		id: '456',
		icon: 'briefcase',
		location: 'Work',
		destination: 'London Eye, London, UK',
	},
];

const NavFavorites = () => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => (
				<View className='bg-gray-200 h-[1px]' />
			)}
			renderItem={({ item: { location, destination, icon } }) => (
				<TouchableOpacity className='flex-row items-center p-5'>
					<View className='mr-4 rounded-full bg-gray-300 p-3'>
						<Icon
							type='ionicon'
							name={icon}
							color='white'
							size={18}
						/>
					</View>
					<View className='flex-1'>
						<Text className='font-semibold text-lg'>
							{location}
						</Text>
						<Text className='text-gray-500'>{destination}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavFavorites;
