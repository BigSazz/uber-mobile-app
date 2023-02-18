import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import EatScreen from './screens/EatScreen';

const Stack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<SafeAreaProvider>
					<KeyboardAvoidingView
						className='flex-1'
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
					>
						<Stack.Navigator>
							<Stack.Screen
								options={{ headerShown: false }}
								name='HomeScreen'
								component={HomeScreen}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name='MapScreen'
								component={MapScreen}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name='EatsScreen'
								component={EatScreen}
							/>
						</Stack.Navigator>
					</KeyboardAvoidingView>
					<StatusBar style='auto' />
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	);
}
