import { Box, Typography, useTheme, useMediaQuery, Grid, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProfileEdit() {
  const theme = useTheme();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const { userId } = useParams(); // Retrieve the userId from the URL

  const token = useSelector((state) => state.token); // Retrieve the token from your Redux store

  const handleSave = async (values) => {
    if (window.confirm("Confirm the change? You have to login again after clicking OK")) {
      try {
        const userProfile = { ...values }; // Create a copy of the updated values object
        const existingProfile = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => response.json());
  
        // Merge the existing picturePath with the updated values
        userProfile.picturePath = existingProfile.picturePath;
  
        await fetch(`http://localhost:3001/users/${userId}`, {
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
        // Handle error
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await fetch(`http://localhost:3001/users/${userId}/delete`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate(`/`); // Navigate to the home page after deleting the account
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }
  };

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "",   }}
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
