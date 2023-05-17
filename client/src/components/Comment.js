import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../axios';

function Comment({ postId }) {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(() => {
    return makeRequest.post('/addcomment', {
      postId,
      commentDesc: comment.trim(),
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
      setComment('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') {
      return;
    }

    mutation.mutate();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div style={{ width: '97%', margin: 'auto', overflow: 'hidden' }}>
          <div className="form-floating col-md-5" style={{ color: '#313131' }}>
            <input
              type="text"
              className="form-control"
              id="comment"
              placeholder="comments"
              style={{ width: '239%', margin: 'auto' }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <label> Leave a Comment </label>
          </div>
        </div>
        <div style={{ marginLeft: '87%', padding: '10px' }}>
          <Button
            type="submit"
            className="btn-dark btn-sm border"
            style={{ padding: '6px', backgroundColor: "#212121" }}
          >
            Comment
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Comment;