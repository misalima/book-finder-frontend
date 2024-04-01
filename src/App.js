import { Navbar } from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';



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
        <Sidebar />
        <MainContent />
      </Box>
    </ThemeProvider>
  );
}

export default App;
