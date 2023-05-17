import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { useContext } from 'react';

function DeletePost({ postId }) {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const deletePost = useMutation(() => makeRequest.post(`/delete/${postId}`));

  const handleDelete = () => {
    deletePost.mutate();
  };

  if (deletePost.isLoading) {
    return <div>Deleting...</div>;
  }

  if (deletePost.isError) {
    return <div>Error deleting post.</div>;
  }

  if (deletePost.isSuccess) {
    // Invalidate the posts query to reflect the updated data
    queryClient.invalidateQueries('posts');
    return <div>Post has been deleted.</div>;
  }

  return (
    <div>
      <i className="fa-solid fa-trash" onClick={handleDelete}/> Delete Post
      
    </div>
  );
}

export default DeletePost;