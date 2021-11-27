import { createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import { fetchData } from "./store/actions/data";
import es from 'dayjs/locale/es'
import RegisterAccount from "./pages/RegisterAccount";



function App() {

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.allData.isLoading);  

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const getData = async () => {
    try {
      await dispatch(fetchData());
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>            
            <Route exact path="/home/*" component={Home} />
            <Route exact path="/home" component={Home} />            
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={RegisterAccount} />
            <Redirect  exact from="/" to="/home"/>            
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
