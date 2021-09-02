import { Container, createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import ContentSwitch from './components/ContentSwitch/ContentSwitch';
import NavBar from './components/NavBar/NavBar';

const Theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  palette: {
    primary: {
      main: '#FFF',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <Container>
          <NavBar />
          <ContentSwitch />
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
