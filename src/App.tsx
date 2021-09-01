import { Container, createTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import MainPage from "./pages/MainPage/MainPage";

const Theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  palette: {
    primary: {
      main: '#FFF'
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <NavBar />
        <MainPage />
      </Container>
    </ThemeProvider>
  );
};

export default App;
