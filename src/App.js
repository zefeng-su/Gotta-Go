// Importing all necessary components, libraries, and pages
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/homePage/HomePage";
import LoginPage from "pages/loginPage/LoginPage";
import ProfilePage from "pages/profilePage/ProfilePage";
import ProfileEdit from "pages/profilePage/ProfileEdit";
import About from "pages/aboutPage/About";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  // useSelector to select 'mode' from the Redux store state, used for setting the theme
  const mode = useSelector((state) => state.mode)
  // useMemo to create the theme using createTheme and themeSettings, and only recompute the memoized value when 'mode' changes
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]) 
  // useSelector to select 'token' from the Redux store state, used for authentication check, it will be true if the token exists (user is authenticated)
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme ={theme}> {/*Providing the created theme to Material-UI components*/} 
      <CssBaseline /> {/*Applying the CSS Baseline to normalize styles*/} 
          <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path = "/about" element = {<About />} />

            {/*Checks if user is authenticated, if yes, renders HomePage, otherwise redirects to Login Page*/}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            
            {/*Checks if user is authenticated, if yes, renders ProfilePage, otherwise redirects to Login Page*/}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />} 
            /> 

            <Route path="/profileEdit/:userId" element={<ProfileEdit />}/>
            <Route path="*" element={<Navigate to="/home" />} /> {/*This is a fallback route which matches all paths not previously matched. Redirects to Home Page*/} 
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;