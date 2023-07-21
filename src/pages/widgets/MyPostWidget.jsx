// Importing necessary libraries and components
import {
    EditOutlined,
    DeleteOutlined,
    ImageOutlined,  
    LocationOnOutlined,
    LocalOfferOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    Button,
    IconButton,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState,useEffect, } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";
  
  function MyPostWidget ({ userId,picturePath }) {
    const dispatch = useDispatch(); // Use the useDispatch hook from Redux 

    // Use the useState hook to create local states for user, isImage, image and post.
    const [user, setUser] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");

    const { palette } = useTheme(); // Use the useTheme hook from Material UI to access the theme object.

    // Use the useSelector hook from Redux to access the user's ID and token from the global state.
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    
    // Define theme properties
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    
    // Fetch the user data from the server using the user's ID and token.
    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      };
    
      // Use the useEffect hook to call the getUser function when the component mounts.
      useEffect(() => {
        getUser();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
      // Return null if the user state is not yet set. This prevents the component from rendering without user data
      if (!user) {
        return null;
      }
    
      const {
        firstName,
      } = user;
    
      // Handles the post submission. It sends a POST request to the server with the form data.
      const handlePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        
        // If an image is provided, append the image and its name to the form data. Else, append an empty string.
        if (image) {
          formData.append("picture", image);
          formData.append("picturePath", image.name);
        } else {
          formData.append("picturePath", ""); // include an empty string for picturePath
        }
      
        // Send the POST request to the server with the form data.
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      
        // Parse the response as JSON and dispatch the setPosts action with the response data.
        const posts = await response.json();
        dispatch(setPosts({ posts }));
      
        // Reset image and post state
        setImage(null);
        setPost("");
        window.location.reload(); //temp solution to refresh after submitting post
      };
      
      
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <InputBase
            placeholder={`What are you recommending, ${firstName}?`}
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "0.75rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <Typography>Add Image Here (jpeg, jpg or png)</Typography>
              
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem">
              <LocationOnOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Location</Typography>
          </FlexBetween>
          <FlexBetween gap="0.25rem">
            <LocalOfferOutlined sx={{ color: mediumMain }}/>
            <Typography color={mediumMain}>Tag</Typography>
            <FormControl variant="standard">
              <Select
                value=""
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem>Food</MenuItem>
                <MenuItem>Services</MenuItem>
                <MenuItem>Attractions</MenuItem>
                <MenuItem>Hobbies</MenuItem>
                <MenuItem>Others</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
         
          
          <FlexBetween></FlexBetween>
          <FlexBetween></FlexBetween>
          <FlexBetween></FlexBetween>
          <FlexBetween></FlexBetween>
          
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;