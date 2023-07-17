import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, deletePost, setLike } from "state";
//import UserImage from "components/UserImage";

function PostWidget ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,}) {
  const [isComments, setIsComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false); //state for tracking edit mode
  const [editedDescription, setEditedDescription] = useState(description); //state for storing the edited description
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const handleEdit = () => {
    setIsEditing(true); // Enter edit mode
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/${postId}/edit`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: editedDescription }), // Send the edited description in the request body
      });
  
      if (response.ok) {
        setIsEditing(false); // Exit edit mode
        dispatch(setPost({ postId, description: editedDescription })); // Pass the postId and editedDescription to the action
      } else {
        // Handle error if the edit request was not successful
        throw new Error("Failed to edit post");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/${postId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Dispatch an action to update the Redux store
        dispatch(deletePost(postId));
        window.location.reload(); // Temp solution to refresh after delete
      } else {
        // Handle error if the delete request was not successful
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const patchLike = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setLike({ post: updatedPost }));
  };

  const isCurrentUserPost = postUserId === loggedInUserId; // Check if the post belongs to the current logged-in user

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle="<Insert Date>"
        userPicturePath={userPicturePath}
      />
      {isEditing ? ( // Render editable description input field when in edit mode
        <InputBase
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          fullWidth
          multiline
          sx={{
            mt: "0.75rem",
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "0.75rem",
            padding: "1rem 1rem",
          }}
        />
      ) : (
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
      )}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.5rem", marginTop: "0.75rem" }}
          src={`${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {isCurrentUserPost && ( // Render delete/edit button only for the current user's posts
          <FlexBetween gap="0.3rem">
            {isEditing ? ( // Render save button when in edit mode
              <IconButton onClick={handleEditSave}>
                <SaveOutlined />
              </IconButton>
            ) : (
              <IconButton onClick={handleEdit}>
                <EditOutlined  />
              </IconButton>
            )}

            <IconButton onClick={handleDelete}>
              <DeleteOutlined />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />

          <FlexBetween mt="0.5rem" gap="1.5rem">
            <InputBase
              placeholder={`Write a comment...`}
              onChange={(e) => setPost(e.target.value)} // Setup as setComment later in state
              value={comments}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "0.75rem",
                padding: "1rem 2rem",
              }}
            />

            <Button
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              POST
            </Button>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
