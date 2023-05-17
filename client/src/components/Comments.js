import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { useContext } from 'react';
import moment from 'moment';
import { Stack } from 'react-bootstrap';
import PostPfp from './PostPfp';
import DeleteComment from './DeleteComment';
import { Link } from 'react-router-dom';


function Comments({ postId }) {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(['comments', postId], () =>
  makeRequest.get(`/getcomments/${postId}`).then((res) => {
  return res.data;
  })
);

  return (
    
  <div>
    {error
      ? "Something went wrong"
      : isLoading
      ? "loading"
      : data.map((comment) => (
          <div className="comment" key={comment.id}>
            <div style={{display: "flex"}}>
              <div>
                <div style={{marginLeft: "15px"}}>
                    {comment.pfp ? <PostPfp src={comment.pfp} alt="pfp"/> : 
                    <PostPfp src="images/blankpfp.jpg" alt="pfp"/>}
                </div>
              </div>

              <div>
                <Stack className='vertical'>
                  <Stack direction="horizontal" gap={2}>
                    <div>
                      <Link to={`/profile/${comment.username}`} style={{textDecoration: "none", color: "inherit"}}>
                        <span style={{fontWeight: "bold", fontSize: "15px"}}>{comment.name}</span>
                      </Link>
                      <span className="date" style={{marginLeft: "4px"}}> {moment(comment.dateCreated).fromNow()} </span>
                    </div>
                    {currentUser.id === comment.userId && (
                    <div style={{position: "absolute", marginLeft: "650px", marginTop: "3px"}}>
                      <DeleteComment commentId={comment.id}/>
                    </div>
                    )}
                  </Stack>
                  <div>
                    <p>{comment.commentDesc}</p>
                  </div>
                </Stack>
              </div>
            </div>
          </div>
        ))}
  </div>
  )
}

export default Comments;