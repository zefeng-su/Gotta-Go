// Import necessary libraries and components
import { Box, Typography, useTheme, useMediaQuery, Grid, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProfileEdit() {
  const theme = useTheme();  // Use the theme context
  const { palette } = useTheme();  // Destructure the palette object from the theme
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Use the useMediaQuery hook from Material-UI to check if the screen width is above 1000 pixels.
  const navigate = useNavigate();   // Use the navigate hook from react-router to change routes
  const { userId } = useParams(); // Retrieve the userId from the URL

  const token = useSelector((state) => state.token); // Retrieve the token from Redux store

  // Handles save profile changes
  const handleSave = async (values) => {
    if (window.confirm("Confirm the change? You have to login again after clicking OK")) {
      try {
        const userProfile = { ...values }; // Create a copy of the updated values object

        // Fetch the existing profile details from the server
        const existingProfile = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => response.json());
  
        // Merge the existing picturePath with the updated values
        userProfile.picturePath = existingProfile.picturePath;
        
        // PATCH request to update the user profile on the server
        await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userProfile),
        });
        navigate(`/`); // Navigate to the home page after saving the profile
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Handles account deletion
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        // DELETE request to delete the user profile on the server
        await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}/delete`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate(`/`); // Navigate to the home page after deleting the account
      } catch (error) {
        console.error(error); 
      }
    }
  };

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", }} // Set initial form values
      onSubmit={(values) => handleSave(values)}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          padding="2rem"
          margin="2rem auto"
          borderRadius="0.75rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="700" variant="h4" sx={{ mb: "1rem" }} textAlign="center">
            Edit your profile
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                fullWidth
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <Button
              type="submit"
              onClick={handleSubmit}
              sx={{
                m: "2rem",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Save
            </Button>

            <Button
              onClick={() => navigate(`/home`)}
              sx={{
                m: "2rem",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Cancel
            </Button>
          </Grid>

          <Grid container justifyContent="center">
            <Button
              onClick={handleDeleteAccount}
              sx={{
                m: "2rem",
                mt: "0rem",
                p: "1rem",
                backgroundColor: "red",
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              !DELETE ACCOUNT!
            </Button>
          </Grid>
        </Box>
      )}
    </Formik>
  );
}

export default ProfileEdit;
