// Importing necessary dependencies and components
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

function Friend ({ friendId, name, subtitle, userPicturePath }) {
  // Redux hooks to dispatch actions and access state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

   // Accessing theme for custom styling
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Check if the current friendId is present in the friends list of the current user
  const isFriend = friends.find((friend) => friend._id === friendId);
  // Check if the current friendId is the same as the current user's ID
  const isCurrentUser = friendId === _id;

  // Function to make PATCH request to the server for adding or removing a friend
  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));  // Dispatch action to update friends list in the Redux store
  };

  // If the current user is not viewing their own profile, and not already on the friend's profile page, then display the add friend button
  let renderAddFriendButton = null;
  if (!isCurrentUser && location.pathname !== `/profile/${friendId}`) {
    renderAddFriendButton = (
      <IconButton
        onClick={() => patchFriend()}
        sx={{
          backgroundColor: primaryLight,
          p: "0.6rem",
        }}
      >
        {/* If the user is already a friend, display the remove friend icon, otherwise display the add friend icon */}
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    );
  }
 
  // Render friend details with profile image, name, subtitle and add friend button if applicable  
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {renderAddFriendButton}
    </FlexBetween>
  );
};

export default Friend;
