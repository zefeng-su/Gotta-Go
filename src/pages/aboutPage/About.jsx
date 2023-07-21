import React from 'react'
import { Box, Typography, useMediaQuery, Button, styled } from "@mui/material";
import gitLogo from 'images/GitHub_Logo_White.png'
import gitMark from 'images/github-mark-white.png'
import { Link } from 'react-router-dom'
import Navbar from 'pages/navbar/Navbar'
 
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

const gitMarkStyle = {
    width: '2rem',
    height: 'auto',
};

const gitLogoStyle = {
    width: '5rem',
    height: 'auto',
 }

function About() {
   
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
            <Typography variant="h6" >This site is created using React.js and Material-UI.</Typography> 
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
            <Typography variant="h6">Su Zefeng</Typography>
              <Link to={`https://github.com/zefeng-su/`}>
                <StyledButton type="button">
                  <img className='git-mark' src={gitMark} style={gitMarkStyle} alt="GitHub_Mark_White"  />
                  <img className='git-logo' src={gitLogo} style={gitLogoStyle} alt="GitHub_Logo_White"  />
                </StyledButton>
              </Link>    
          </Box>
            
          <Box>
            <Typography variant="h6">Sim Chun Kiat</Typography>
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