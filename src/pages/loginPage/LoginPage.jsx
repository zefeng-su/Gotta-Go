// Import necessary dependencies and components
import { Box , Typography, useTheme, useMediaQuery } from "@mui/material"
import Form from './Form'

function LoginPage () {
    const theme = useTheme();  // Using the `useTheme` hook to allow access to the default theme
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Use the useMediaQuery hook from Material-UI to check if the screen width is above 1000 pixels.
   
    return (
    <Box>
        <Box
            width="100%" 
            backgroundColor={theme.palette.background.alt} 
            padding="1rem 6%"
            textAlign="center">
            <Typography
                fontWeight="bold"
                variant="h1"
                color="primary" 
            >
            GottaGo!
            </Typography>
        </Box> 

        <Box
            width={isNonMobileScreens? "50%" : "93%"}  
            padding="2rem"  
            margin="2rem auto"
            borderRadius="0.75rem"  
            backgroundColor={theme.palette.background.alt} 
        >   
            <Typography
                fontWeight="700"
                variant="h4"
                sx={{mb: "1rem"}}
                textAlign="center"
            >
            Welcome to GottaGo! 
            
            </Typography>    
            <Form />
        </Box>  
         
    </Box>  
    )
} 

export default LoginPage;