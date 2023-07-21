// Importing necessary libraries and components
import {
  ManageAccountsOutlined,
  //EditOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserWidget({ userId, picturePath }) {
  const [user, setUser] = useState(null);  // Defining local state variable 'user'.  
  const { palette } = useTheme(); // useTheme hook is used to access the theme values.
  const navigate = useNavigate(); // Hook used for navigation
  const token = useSelector((state) => state.token); // Extracting the token from the redux state
  const loggedInUserId = useSelector((state) => state.user._id); // Extracting the logged in user's Id from the redux state

  // Define some color values for use in component styling
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // GET user details from backend API
  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }, // Pass the token in the headers for authentication
    });
    const data = await response.json(); // Parse the response data to JSON
    setUser(data); // Update the 'user' state with the fetched data
  };

   // Using the useEffect hook to call getUser when the component first mounts
  useEffect(() => {
    getUser(); 
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

   // Return null if the user state is not yet set. This prevents the component from rendering without user data
  if (!user) {
    return null;
  }

  // Destructure the user object into the variables needed
  const {
    firstName,
    lastName,
    viewedProfile,
    impressions,
    friends,
  } = user;

  const isCurrentUser = loggedInUserId === userId;  // Define a boolean to check if the user being rendered is the logged in user

  return (
    <WidgetWrapper>
      {/* NAME ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              onClick={() => navigate(`/profile/${userId}`)}
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium} fontWeight="500">
              {friends.length} Friends
            </Typography>
          </Box>
        </FlexBetween>
        {isCurrentUser && (
          <ManageAccountsOutlined
            onClick={() => navigate(`/profileEdit/${userId}`)}
          />
        )}
      </FlexBetween>

      <Divider />

      {/* STATS ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Profile views</Typography>
          <Typography color={main} fontWeight="700">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Recommendations posted</Typography>
          <Typography color={main} fontWeight="700">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}

export default UserWidget;
