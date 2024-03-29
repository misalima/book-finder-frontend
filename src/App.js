import { Navbar } from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#22a39f',
        dark: '#222222',
      },
      secondary: {
        main: '#f3efe0',
        dark: '#434242',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box classname="App">
        <CssBaseline />
        <Navbar />
        <Outlet />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
