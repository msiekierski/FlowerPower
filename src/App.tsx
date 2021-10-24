import { Container, createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import ContentSwitch from './components/ContentSwitch/ContentSwitch';
import NavBar from './components/NavBar/NavBar';


export const Theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  palette: {
    primary: {
      main: '#FFF',
    },
    secondary: {
      main: '#000',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 900,
      lg: 1024,
      xl: 1440,
    },
  },
  typography: {
    fontFamily: `"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace`,
  },
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <Container maxWidth="xl">
          <NavBar />
          <ContentSwitch />
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
