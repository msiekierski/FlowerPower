import { Container, createTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import ContentSwitch from "./components/ContentSwitch/ContentSwitch";
import NavBar from "./components/NavBar/NavBar";

const Theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  palette: {
    primary: {
      main: "#FFF",
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
