// Import necessary dependencies and components
import React from 'react'
import { Box, Typography, useMediaQuery, Button, styled } from "@mui/material";
import gitLogo from 'images/GitHub_Logo_White.png'
import gitMark from 'images/github-mark-white.png'
import { Link } from 'react-router-dom'
import Navbar from 'pages/navbar/Navbar'

// Define a custom styled button with specific styles
const StyledButton = styled(Button)({
  backgroundColor: 'black',
  border: 'none',
  padding: '8px 16px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-flex',
  borderRadius: '8px',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: 'grey',
    cursor: 'pointer',
  },
});

// Define styles for GitHub mark and logo images
const gitMarkStyle = { width: '2rem', height: 'auto', };
const gitLogoStyle = { width: '5rem', height: 'auto', }

function About() {

    // Use the useMediaQuery hook from Material-UI to check if the screen width is above 1000 pixels.
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return (
    <Box>
      <Navbar /> 
      <Box padding={isNonMobileScreens ? '7.5rem' : '3.5rem'} paddingTop='1.5rem'>
          <Box
            sx={{
              marginBottom: '0.1rem',
            }}
          > 
            <Typography
              fontSize="16"
              fontWeight="Bold"
              variant="h3"
            > About:</Typography>
          </Box>  
          <Box
             sx={{
              marginBottom: '1rem',
            }}
          >
            <Typography variant="h6" >This site is created using full MERN stack, Material-UI, Redux Toolkit, Formik and Dropzone.</Typography> 
          </Box>  
      
          <Box
            sx={{
              marginBottom: '0.25rem',
            }}
          > 
            <Typography 
              fontSize="14"
              fontWeight="Bold"
              variant="h4"
            > Find us at:</Typography> 
          </Box>

          <Box
           sx={{
            marginBottom: '1rem',
           }}
          >
            <Typography variant="h6">Su Zefeng, Frontend</Typography>
              <Link to={`https://github.com/zefeng-su/`}>
                <StyledButton type="button">
                  <img className='git-mark' src={gitMark} style={gitMarkStyle} alt="GitHub_Mark_White"  />
                  <img className='git-logo' src={gitLogo} style={gitLogoStyle} alt="GitHub_Logo_White"  />
                </StyledButton>
              </Link>    
          </Box>
            
          <Box>
            <Typography variant="h6">Sim Chun Kiat, Backend</Typography>
              <Link to={`https://github.com/SIMCHUNKIAT/`}>
                <StyledButton type="button" >
                  <img className='git-mark' src={gitMark} style={gitMarkStyle} alt="GitHub_Mark_White"  />
                  <img className='git-logo' src={gitLogo} style={gitLogoStyle} alt="GitHub_Logo_White"  />
                </StyledButton>
              </Link>    
          </Box>
      </Box>
    </Box>
  )
}

export default About