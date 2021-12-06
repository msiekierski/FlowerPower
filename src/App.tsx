import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ContentSwitch from './components/ContentSwitch/ContentSwitch';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import { RootState } from './redux/root-reducer';
import { actionCreators } from './redux/user';

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
    background: {
      default: '#FCFCFC',
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
  const { location } = useSelector((root: RootState) => root.user);
  const { setLocation } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchLocation(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  const fetchLocation = async (lat: number, long: number) => {
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBqtUDpLTnFrLwf2HJVzMYxHe-w2WE6EFA`
      );
      console.log(data.results);
      setLocation({
        lat: lat,
        long: long,
        city: data.results[0].address_components[4].short_name,
        formattedAddress: data.results[0].formatted_address,
      });
    } catch (e) {}
  };

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <div style={{ margin: '0 5%', marginBottom: '100px' }}>
          <CssBaseline />
          <NavBar />
          <ContentSwitch />
        </div>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
