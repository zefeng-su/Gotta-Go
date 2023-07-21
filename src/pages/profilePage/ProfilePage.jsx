// Importing required libraries and components
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "pages/navbar/Navbar";
import FriendListWidget from "pages/widgets/FriendListWidget";
import MyPostWidget from "pages/widgets/MyPostWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import UserWidget from "pages/widgets/UserWidget";

function ProfilePage() {
  const [user, setUser] = useState(null); // Initialize state for user and set default as null
  const { userId } = useParams();  // Extract user ID from the URL parameters
  const token = useSelector((state) => state.token); // Use useSelector hook to get the token from the Redux store
  const loggedInUserId = useSelector((state) => state.user._id);  // Get the ID of the currently logged-in user from Redux store
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Use the useMediaQuery hook from Material-UI to check if the screen width is above 1000 pixels.

  //GET request to the server to retrieve user information
  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }, // Pass the token in the headers for authentication
    });
    const data = await response.json(); // Parse the response data as JSON
    setUser(data); // Update the user state with the received data
  };

  // Use useEffect hook to call getUser function, ensures that getUser is called as a side effect after the component's first render.
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;  // Render null if user data is not yet received

  const isCurrentUser = loggedInUserId === userId; // Check if the profile being viewed is of the currently logged-in user

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
         {/* Render User Widget and Friend List Widget on the left */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>

        {/* Render Posts on the right. If the profile belongs to the current user, allow them to make a new post */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {isCurrentUser && (
            <>
              <MyPostWidget userId={userId} picturePath={user.picturePath} />
              <Box m="2rem 0" />
            </>
          )}
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
