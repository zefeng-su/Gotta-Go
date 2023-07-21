// Import necessary dependencies and components
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "pages/navbar/Navbar";
import UserWidget from "pages/widgets/UserWidget";
import MyPostWidget from "pages/widgets/MyPostWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import { useSelector } from "react-redux";
import FriendListWidget from "pages/widgets/FriendListWidget";


function HomePage () {
    // Use the useMediaQuery hook from Material-UI to check if the screen width is above 1000 pixels.
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    // Access the "_id" and "picturePath" properties from the "user" state using useSelector from React Redux.
    // These properties will be used as props in the UserWidget, MyPostWidget, and FriendListWidget components.
    const {_id, picturePath } = useSelector((state)=>state.user);

    return (
        <Box> 
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display= {isNonMobileScreens? "flex":"block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens? "26%": undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box flexBasis={isNonMobileScreens? "42%": undefined}
                     mt={isNonMobileScreens? undefined: "2rem"}>

                    <MyPostWidget userId={_id} picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>       
    )
} 

export default HomePage;