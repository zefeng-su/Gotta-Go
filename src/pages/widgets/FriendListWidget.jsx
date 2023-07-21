// Importing necessary libraries and components
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

function FriendListWidget ({ userId }) {
  const dispatch = useDispatch(); // Setting up dispatch to dispatch actions
  const { palette } = useTheme();  // Accessing the theme to get the palette
  const token = useSelector((state) => state.token);  // Accessing the token from the redux store 
  const friends = useSelector((state) => state.user.friends);  // Accessing the friends list from the redux store

  const getFriends = async () => {
    // GET request to the server to fetch friends
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }, // Passing the token in the headers for authentication
      }
    );
    const data = await response.json(); // Converting the response to json
    dispatch(setFriends({ friends: data }));  // Dispatching the setFriends action to update the friends list in the redux store
  };

  // Using useEffect to fetch the friends when the component is mounted
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friends
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;