import { Box, Typography, useTheme, useMediaQuery, Grid, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

function ProfileEdit() {
  const theme = useTheme();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  return (
    <Formik>
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
            <TextField label="First Name" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Last Name" fullWidth />
          </Grid>
        </Grid>

        <Dropzone
         acceptedFiles=".jpg,.jpeg,.png"
         multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #999",
                borderRadius: "0.75rem",
                padding: "2rem",
                marginTop: "2rem",
                textAlign: "center",
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body1">Drag and drop files here</Typography>
              <Typography variant="body2">or click to browse</Typography>
            </Box>
          )}
        </Dropzone>

        <Grid container justifyContent="center">
          <Button
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
            sx={{
              m: "2rem",
              mt:"0rem",
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
    </Formik>
  );
}

export default ProfileEdit;
