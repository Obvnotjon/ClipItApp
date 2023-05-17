import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { useContext } from 'react';

function DeleteComment({ commentId }) {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const deleteComment = useMutation(() => makeRequest.post(`/delete/comment/${commentId}`));

  const handleDelete = () => {
    deleteComment.mutate();
  };

  if (deleteComment.isLoading) {
    return <div>Deleting...</div>;
  }

  if (deleteComment.isError) {
    return <div>Error deleting comment.</div>;
  }

  if (deleteComment.isSuccess) {
    // Invalidate the comments query to reflect the updated data
    queryClient.invalidateQueries('comments');
  }

  return (
    <div>
      <i className="fa-solid fa-trash" onClick={handleDelete}/>
    </div>
  );
}

export default DeleteComment;