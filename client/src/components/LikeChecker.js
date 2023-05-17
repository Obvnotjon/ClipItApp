import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { useContext } from 'react';
import { Stack } from 'react-bootstrap';

function LikeChecker({ postId }) {
  const { isLoading, error, data: likeStatus, refetch: refetchLikeStatus } = useQuery(["likeStatus", postId], () =>
    makeRequest.get(`/like-status/${postId}`).then((res) => res.data)
  );

  const { isLoading: countLoading, data: likeCount, refetch: refetchLikeCount } = useQuery(["likeCount", postId], () =>
    makeRequest.get(`/like-count/${postId}`).then((res) => res.data.likeCount)
  );

  const handleLike = () => {
    makeRequest.post(`/likepost/${postId}`).then(() => {
      refetchLikeStatus(); // Update the like status after liking the post
      refetchLikeCount(); // Update the like count after liking the post
    });
  };

  const handleUnlike = () => {
    makeRequest.post(`/unlikepost/${postId}`).then(() => {
      refetchLikeStatus(); // Update the like status after unliking the post
      refetchLikeCount(); // Update the like count after unliking the post
    });
  };

  if (isLoading || countLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const isLiked = likeStatus === 'liked';

  return (
    <div>
      <Stack direction="horizontal" gap={2}>
        {isLiked ? (
          <div>
            <i className="fa-solid fa-heart" style={{ color: "red" }} onClick={handleUnlike} />
          </div>
        ) : (
          <div>
            <i className="fa-solid fa-heart" onClick={handleLike} />
          </div>
        )}
        <div style={{marginTop: "15px"}}>
          <p>{likeCount} Likes</p>
        </div>
      </Stack>
    </div>
  );
}

export default LikeChecker;