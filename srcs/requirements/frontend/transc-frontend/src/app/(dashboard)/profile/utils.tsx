import { useEffect, useState } from "react";
import {
  MessageData,
  friendShip,
  history,
  leaders_list,
  notif,
  notifMessage,
  opponents,
  userStat,
  users_int,
} from "../../../../interfaces";
import axios from "axios";

export function useUserData(userId: string) {
  const [user, setUser] = useState<users_int>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}`
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/friend`, {
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
      `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/friend/${friendId}`,
      {
        method: "PATCH",
        credentials: "include",
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
      `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/friend/${friendId}`,
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

export function getOpponents(
  history: history[],
  userId: string
): opponents[] | null {
  const [opponents, setOpponents] = useState<users_int[] | null>(null);
  const [profileUser, setProfileUser] = useState<users_int>();
  const [historyGame, setHistoryGame] = useState<opponents[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}`
        );
        setProfileUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const opponentId = history.map((h) => (
      userId === h.playerA_id ? h.playerB_id : h.playerA_id
    ));

    const fetchUsers = async () => {
      try {
        const userResponses = await Promise.all(
          opponentId.map((id) => axios.get(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${id}`))
        );

        const op = userResponses.map((response) => response.data);
        setOpponents(op);

        const updatedHistoryGame: opponents[] = [];

        history.forEach((h, index) => {
          if (op[index] && profileUser) {
            const opponent = op[index];
            const isPlayerA = h.playerA_id === op[index].id;

            const holder: opponents = {
              playerA_name: profileUser.name,
              playerA_Avatar: profileUser.Avatar,
              playerA_Score: isPlayerA ? h.playerB_Score : h.playerA_Score,
              playerB_name: opponent.name,
              playerB_Avatar: opponent.Avatar,
              playerB_Score: isPlayerA ? h.playerA_Score : h.playerB_Score,
            };

            updatedHistoryGame.push(holder);
          }
        });

        setHistoryGame(updatedHistoryGame);
      } catch (error) {
        console.log(error);
        setOpponents([]);
      }
    };

    if (opponentId.length > 0) {
      fetchUsers();
    } else {
      setOpponents([]);
    }
  }, [history, profileUser]);
  return historyGame;
}

export function usePendingUsers(
  friendShip: friendShip[],
  userSession: string
): notif[] | null {
  const [pendingUsers, setPendingUsers] = useState<notif[] | null>(null);
  useEffect(() => {
    const friendIds = friendShip.map((friend) => {
      return userSession === friend.friendId ? friend.userId : friend.friendId;
    });

    const fetchUsers = async () => {
      try {
        const userResponses = await Promise.all(
          friendIds.map((friendId) =>
            axios.get(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${friendId}`)
          )
        );

        const pendingUsersData: notif[] = userResponses.map(
          (response) => response.data
        );
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

export function leadersList(users: users_int[]): leaders_list[] | null {
  const [userState, setUserState] = useState<userStat[]>([]);
  const [playeRank, setPlayeRank] = useState<leaders_list[]>([]);
  const playeRankMap: Map<string, leaders_list> = new Map();

  useEffect(() => {
    const ids = users.map((u) => {
      return u.id;
    });

    const fetchUsers = async () => {
      try {
        const userStateResponses = await Promise.all(
          ids.map((id) =>
            axios.get(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${id}/userStat`)
          )
        );

        const userStates = userStateResponses.map((response) => response.data);
        setUserState(userStates);

        users.map((p, index) => {
          let val: leaders_list;
          if (userStates[index]) {
            val = {
              user: users[index],
              rate: userStates[index]?.rate,
              winsNumbr: userStates[index]?.winsNumbr,
              lossesNumbr: userStates[index]?.lossesNumbr,
            };
          } else {
            val = {
              user: users[index],
              rate: 0,
              winsNumbr: 0,
              lossesNumbr: 0,
            };
          }
          playeRankMap.set(p.id, val);
        });

        setPlayeRank(Array.from(playeRankMap.values()));
      } catch (error) {
        console.log(error);
        setPlayeRank([]);
      }
    };
    if (ids.length > 0) {
      fetchUsers();
    } else {
      setPlayeRank([]);
    }
  }, [users]);
  return [...playeRank].sort((a, b) => b.rate - a.rate);
}

export function usePendingMessage(
  MessageData: MessageData[]
): notifMessage[] | null {
  const [pendingUsers, setPendingUsers] = useState<users_int[] | null>(null);
  const notifMessagesMap: Map<string, notifMessage> = new Map();
  const [notifMessages, setNotifMessages] = useState<notifMessage[] | null>([]);
  useEffect(() => {
    const senderIds = MessageData.map((msg) => {
      return msg.senderId;
    });

    const fetchUsers = async () => {
      try {
        const userResponses = await Promise.all(
          senderIds.map((senderId) =>
            axios.get(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${senderId}`)
          )
        );

        const pendingUsersData = userResponses.map((response) => response.data);
        setPendingUsers(pendingUsersData);

        MessageData.map((message, index) => {
          const { senderId, content } = message;

          if (notifMessagesMap.has(senderId)) {
            const existingMessage = notifMessagesMap.get(senderId);
            if (existingMessage) {
              existingMessage.numberOfMsg++;
            }
          } else {
            const newMessage: notifMessage = {
              user: pendingUsersData[index],
              numberOfMsg: 1,
              content,
            };
            notifMessagesMap.set(senderId, newMessage);
          }
        });
        setNotifMessages(Array.from(notifMessagesMap.values()));
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

  return notifMessages;
}

export async function block(userId: string, blockedId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/blockedUser`, {
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
      `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/unBlockedUser/${blockedId}`,
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
