import { useEffect, useState } from "react";
import { MessageData, friendShip, notif, users_int } from "../../../../interfaces";
import axios from "axios";

export function useUserData(userId: string) {
  const [user, setUser] = useState<users_int>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return user;
}

export async function createFriend(userId: string, friendId: string) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/users/friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friendShipStatus: "PENDING",
        userId: `${userId}`,
        friendId: `${friendId}`,
      }),
    });
    if (response.ok) return true;
    else {
      console.error("Post failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}

export async function updateFriend(userId: string, friendId: string) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/users/${userId}/friend/${friendId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendShipStatus: "ACCEPTED",
          userId: `${userId}`,
          friendId: `${friendId}`,
        }),
      }
    );
    if (response.ok) return true;
    else {
      console.error("Patch failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}

export async function deleteFriend(userId: string, friendId: string) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/users/${userId}/friend/${friendId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) return true;
    else {
      console.error("Delete failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}

export function usePendingUsers(friendShip: friendShip[], userSession: string): notif[] | null {
  
  const [pendingUsers, setPendingUsers] = useState<notif[] | null>(null);
  useEffect(() => {
    // Get an array of all the friendIds
    const friendIds = friendShip.map((friend) => {
      return userSession === friend.friendId ? friend.userId : friend.friendId;
    });

    // Use Promise.all to fetch user data for all the friendIds at once
    const fetchUsers = async () => {
      try {
        const userResponses = await Promise.all(
          friendIds.map((friendId) =>
            axios.get(`http://127.0.0.1:3000/users/${friendId}`)
          )
        );

        const pendingUsersData: notif[] = userResponses.map((response, index) => (
           response.data
          // response.data.created_at = friendShip[index].created_at && response.data
        ));
        console.log("FriendShip ====> ", friendShip)
        console.log("PENDING ====> ", pendingUsersData)
        setPendingUsers(pendingUsersData);
      } catch (error) {
        console.log(error);
        setPendingUsers([]);
      }
    };

    if (friendIds.length > 0) {
      fetchUsers();
    } else {
      setPendingUsers([]);
    }
  }, [friendShip]);

  return pendingUsers;
}


export function usePendingMessage(
  MessageData: MessageData[],
): users_int[] | null {
  const [pendingUsers, setPendingUsers] = useState<users_int[] | null>(null);

  // const uniqueSenders: Record<string, boolean>  = {};
  // const filteredMessages = [...MessageData].filter((message) => {
  //   if (!uniqueSenders[message.senderId]) {
  //     uniqueSenders[message.senderId] = true;
  //     return true;
  //   }
  //   return false;
  // });
  
  
  useEffect(() => {
    const senderIds = MessageData.map((msg) => {
      return msg.senderId;
    });

    const fetchUsers = async () => {
      try {
        const userResponses = await Promise.all(
          senderIds.map((senderId) =>
            axios.get(`http://127.0.0.1:3000/users/${senderId}`)
          )
        );

        const pendingUsersData = userResponses.map((response) => response.data);
        setPendingUsers(pendingUsersData);
      } catch (error) {
        console.log(error);
        setPendingUsers([]);
      }
    };

    if (senderIds.length > 0) {
      fetchUsers();
    } else {
      setPendingUsers([]);
    }
  }, [MessageData]);

  return pendingUsers;
}

export async function block(userId: string, blockedId: string) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/users/blockedUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: `${userId}`,
        blockedUserId: `${blockedId}`,
      }),
    });
    if (response.ok) return true;
    else {
      console.error("POST failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function unblock(userId: string, blockedId: string) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/users/${userId}/unBlockedUser/${blockedId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: `${userId}`,
          blockedUserId: `${blockedId}`,
        }),
      }
    );
    if (response.ok) return true;
    else {
      console.error("POST failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
