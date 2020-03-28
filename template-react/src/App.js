import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Signin from './routes/Signin';
import Signup from './routes/Signup'
import Main from './routes/Main'
import './App.css';
const themeLight = createMuiTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#dc004e'
		},
		custom: {
			kakao: '#ffe500',
			kakaoHover: '#c7b300'
		}
	},
})
const themeDark = createMuiTheme({
	palette: {
		background: {
			paper: '#303030'
		},
		type: 'dark',
		primary: {
			main: '#202020',
		},
		secondary: {
			main: '#202020',
		},
		custom: {
			kakao: '#ffe500',
			kakaoHover: '#c7b300'
		}
	},
})
export const PaletteTypeContext = createContext({
	paletteType: {},
	setPaletteType: {},
});

const App = () => {
	const [paletteType, setPaletteType] = useState('light');
	const value = {
		paletteType,
		setPaletteType
	}
	return (
		<PaletteTypeContext.Provider value={value}>
			<ThemeProvider theme={paletteType === 'light' ? themeLight : themeDark}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/signin" component={Signin} />
						<Route exact path="/signup" component={Signup} />
						<Route path="/" component={Main} />
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		</PaletteTypeContext.Provider>
	);
}

export default App;
