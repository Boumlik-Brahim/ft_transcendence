
import { useEffect, useState } from "react";
import { friendShip, users_int } from "../../../../interfaces";
import axios from "axios";


export function useUserData(userId: string) {
  const [user, setUser] = useState<users_int>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/users/${userId}`);
        setUser(response.data);
      } catch (error) { console.log(error); }
    }
    fetchUser();
  }, []);
  return user;
}

export async function createFriend(userId: string, friendId: string) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/users/friend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "friendShipStatus": "PENDING",
        "userId": `${userId}`,
        "friendId": `${friendId}`
      })
    });
    if (response.ok) return true
    else { console.error('Post failed:', response.status); }
  } catch (error) { console.error('Error:', error); }
  return false;
}

export async function updateFriend(userId: string, friendId: string) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/users/${userId}/friend/${friendId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "friendShipStatus": "ACCEPTED",
        "userId": `${userId}`,
        "friendId": `${friendId}`
      })
    });
    if (response.ok) return true
    else { console.error('Patch failed:', response.status); }
  } catch (error) { console.error('Error:', error); }
  return false;
}

export async function deleteFriend(userId: string, friendId: string) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/users/${userId}/friend/${friendId}`, {
      method: 'DELETE',
    });
    if (response.ok) return true
    else { console.error('Delete failed:', response.status) }
  } catch (error) { console.error('Error:', error) }
  return false;
}

export function usePendingUsers(friendShip: friendShip[]): users_int[] | null {
  const [pendingUsers, setPendingUsers] = useState<users_int[] | null>(null);

  useEffect(() => {
    // Get an array of all the friendIds
    const friendIds = friendShip.map((friend) => friend.userId);

    // Use Promise.all to fetch user data for all the friendIds at once
    const fetchUsers = async () => {
      try {
        const userResponses = await Promise.all(
          friendIds.map((friendId) => axios.get(`http://127.0.0.1:3000/users/${friendId}`))
        );

        const pendingUsersData = userResponses.map((response) => response.data);
        setPendingUsers(pendingUsersData);
      } catch (error) {
        console.log(error);
        setPendingUsers([]);
      }
    };

    if (friendIds.length > 0) { fetchUsers(); }
    else { setPendingUsers([]); }
  }, [friendShip]);

  return pendingUsers;
}

export async function block(userId: string, blockedId: string) {
  console.log('~~~~~~~~~~~~BLOCK')
  try {
    const response = await fetch(`http://127.0.0.1:3000/users/blockedUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userId": `${userId}`,
        "blockedUserId": `${blockedId}`
      })
    });
    if (response.ok) return true
    else { console.error('POST failed:', response.status) }
  } catch (error) { console.error('Error:', error) }
}

export async function unblock(userId: string, blockedId: string) {
  console.log('~~~~~~~~~~~~UNBLOCK')
  try {
    const response = await fetch(`http://127.0.0.1:3000/users/${userId}/unBlockedUser/${blockedId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userId": `${userId}`,
        "blockedUserId": `${blockedId}`
      })
    });
    if (response.ok) return true
    else { console.error('POST failed:', response.status) }
  } catch (error) { console.error('Error:', error) }
}