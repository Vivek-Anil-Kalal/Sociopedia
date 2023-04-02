import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WigetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import ENV from "config.js"

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    let haveFriends;
    if (friends.length !== 0 && friends.length !== undefined) {
        haveFriends = true;
    } else {
        haveFriends = false;
    }

    const getFriends = async () => {
        const response = await fetch(
            `${ENV.BACKEND_URL}/users/${userId}/friends`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.json();
        dispatch(setFriends({ friends: data }))
    }

    useEffect(() => {
        getFriends()
        haveFriends = true;
    },[]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                FriendsList
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {haveFriends ? friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.userPicturePath}
                    />
                )) : ''}
            </Box>
        </WidgetWrapper>
    )
}

export default FriendListWidget;