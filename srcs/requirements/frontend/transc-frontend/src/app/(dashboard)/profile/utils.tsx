
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
