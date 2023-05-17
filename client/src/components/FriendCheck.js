import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../axios";
import AddFriend from './AddFriend';
import RemoveFriend from './RemoveFriend';

function FriendCheck({ friendId }) {
  const { isLoading, error, data } = useQuery(["friendsys", friendId], () =>
    makeRequest.get(`/friendship-status/${friendId}`).then((res) => res.data)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const isFriend = data === 'friends';

  return (
    <div>
      {isFriend ? (
        <RemoveFriend friendId={friendId} />
      ) : (
        <AddFriend friendId={friendId} />
      )}
    </div>
  );
}

export default FriendCheck;