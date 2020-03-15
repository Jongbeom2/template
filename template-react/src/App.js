import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
       < Main/>
    </ThemeProvider>
  );
}

export default App;
