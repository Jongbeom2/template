import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import RouteMatcher from './routes/RouteMatcher';
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#3498db',
		},
		secondary: {
			main: '#2980b9'
		},
	},
})
const App = () => {
  return (
    <ThemeProvider theme={theme}>
			<HashRouter>
				<Route path="/:route" component={RouteMatcher} />
			</HashRouter>
    </ThemeProvider>
  );
}

export default App;
