import React from 'react';
import CountryPicker from './CountryPicker/CountryPicker';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {     
    secondary: {
      main: '#ab003c', 
    },
  },
});



const App = () => {
  return (
    <>
      <ThemeProvider theme={theme} >
       <CountryPicker />
      </ThemeProvider>
    </>
  )
}

export default App;