import React from 'react';
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
			main: '#303030',
		},
		secondary: {
			main: '#303030',
		},
		custom: {
			kakao: '#ffe500',
			kakaoHover: '#c7b300'
		}
	},
})
const App = () => {
	return (
		<ThemeProvider theme={themeDark}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/signin" component={Signin} />
					<Route exact path="/signup" component={Signup} />
					<Route path="/" component={Main} />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
