import React from 'react'
import { Box, Typography } from "@mui/material";
import gitLogo from 'images/GitHub_Logo_White.png'
import gitMark from 'images/github-mark-white.png'
import { Link } from 'react-router-dom'
import Navbar from 'pages/navbar/Navbar'

const buttonStyle = {
    backgroundColor: 'black',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-flex',
    borderRadius: '8px',
    fontSize: '16px',
    "&:hover": {
        color: 'darkGrey',
        cursor: "pointer",
      }
  };

const gitMarkStyle = {
    width: '2rem',
    height: 'auto',
};

const gitLogoStyle = {
    width: '5rem',
    height: 'auto',
 }

function About() {
    // const theme = useTheme();
    // const neutralLight = theme.palette.neutral.light;
    // const dark = theme.palette.neutral.dark;
    // const background = theme.palette.background.default;
    // const primaryLight = theme.palette.primary.light;
    // const alt = theme.palette.background.alt;
    // const mediumMain = theme.palette.neutral.mediumMain;

    return (
    <Box>
        <Navbar /> 
        <Box> 
          <Typography>About</Typography>
          <Typography>This site is created using React.js and Material-UI.</Typography> 
        </Box>  
        <Typography>Find us at:</Typography> 
          
            <Link to={`https://github.com/zefeng-su/`}>
            <button type="button" style={buttonStyle}>
                <img className='git-mark' src={gitMark} style={gitMarkStyle} alt="GitHub_Mark_White"  />
                <img className='git-logo' src={gitLogo} style={gitLogoStyle} alt="GitHub_Logo_White"  />
              </button>
            </Link>       
    </Box>
  )
}

export default About