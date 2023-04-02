import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import ENV from 'config.js'

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)

    const getPosts = async () => {
        const response = await fetch(`${ENV.BACKEND_URL}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })

        const data = await response.json();
        dispatch(setPosts({ posts: data }))
    }

    const getUserPosts = async () => {
        const response = await fetch(`${ENV.BACKEND_URL}/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })

        const data = await response.json();
        dispatch(setPosts({ posts: data }))
    }

    // this will give the all post when first render and then if isProfile is there then user Posts
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            {
                posts.map(
                    ({
                        _id,
                        userId,
                        firstName,
                        lastName,
                        description,
                        location,
                        picturePath,
                        userPicturePath,
                        likes,
                        comments,
                    }) => (
                        <PostWidget
                            key={_id}
                            postId={_id}
                            postUserId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            location={location}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                            likes={likes}
                            comments={comments}
                        />
                    )
                )}
        </>
    )
}

export default PostsWidget
