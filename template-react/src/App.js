import React from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Login from './routes/Login';
import Register from './routes/Register'
import Main from './routes/Main'
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
			<BrowserRouter>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route path="/" component={Main} />
				</Switch>
			</BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
