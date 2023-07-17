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
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;


  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser(); 
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    //location,
    viewedProfile,
    impressions,
    friends,
  } = user;

  const isCurrentUser = loggedInUserId === userId;

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
