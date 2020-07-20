import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Signin from './routes/Signin';
import Signup from './routes/Signup'
import Main from './routes/Main'
import './App.css';
/** 
 * @author : 이종범
 * @description
 * 앱의 첫 번째 component로 theme과 router를 설정함.
 * @since : 2020.04.15
*/
const themeLight = createMuiTheme({
	/**
	 * @description
	 * 밝은 theme 객체를 정의함.
	 */
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
	/**
	 * @description
	 * 어두운 theme 객체를 정의함.
	 */
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
export const ThemeTypeContext = createContext({
	/**
	 * @description
	 * 다른 component에서 themeType을 읽고 수정할 수 있도록 context를 정의함.
	 * themeType에 따라  ThemeProvider에 적절한 theme을 전달함
	 */
	paletteType: {},
	setPaletteType: {},
});
const App = () => {
	const [themeType, setThemeType] = useState('light');
	const value = {
		themeType,
		setThemeType
	}
	return (
		<ThemeTypeContext.Provider value={value}>
			<ThemeProvider theme={themeType === 'light' ? themeLight : themeDark}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/signin" component={Signin} />
						<Route exact path="/signup" component={Signup} />
						<Route path="/" component={Main} />
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		</ThemeTypeContext.Provider>
	);
}

export default App;
