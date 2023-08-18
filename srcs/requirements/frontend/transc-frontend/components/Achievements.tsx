"use client";
import Image from "next/image";
import {
  _1337_friends,
  _1337_friends_gif,
  _1337_games,
  _1337_games_gif,
  _1337_in_score,
  _1337_in_score_gif,
  _1337_messages,
  _1337_messages_gif,
  _19_friends,
  _19_friends_gif,
  _19_games,
  _19_games_gif,
  _19_in_score,
  _19_in_score_gif,
  _19_messages,
  _19_messages_gif,
  _21_friends,
  _21_friends_gif,
  _21_games,
  _21_games_gif,
  _21_in_score,
  _21_in_score_gif,
  _21_messages,
  _21_messages_gif,
  _42_friends,
  _42_friends_gif,
  _42_games,
  _42_games_gif,
  _42_in_score,
  _42_in_score_gif,
  _42_messages,
  _42_messages_gif,
  _create_account,
  _create_account_gif,
  _have_one_friend,
  _have_one_friend_gif,
  _send_first_msg,
  _send_first_msg_gif,
  _your_first_game,
  _your_first_game_gif,
} from "../public";
import { useEffect, useState } from "react";
import { users_int } from "../interfaces";
import axios from "axios";
import { socket } from "./Notification";
// import { socket } from "@/app/(dashboard)/profile/[userId]/page";

type Props = {
  userId: string;
  userSessionId: string;
};

export default function Achievements({ userId, userSessionId }: Props) {
  /* ------------------------------ fetch Friend ------------------------------ */
  const [notification, setNotification] = useState<string>("");
  const [friends, setFriends] = useState<users_int[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URI}/users/${userId}/friend`
        );
        setFriends(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [notification]);
  /* ------------------------------------ - ----------------------------------- */

  /* ----------------------------- message Number ----------------------------- */
  const [msgNum, setMsgNum] = useState<number>();

  useEffect(() => {
    const fetchMsgNum = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/chat/msgNumber/${userId}`
        );
        setMsgNum(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMsgNum();
  }, [userId]);

  /* ------------------------------------ - ----------------------------------- */

  /* -------------------------- friend requset socket ------------------------- */
  useEffect(() => {
    socket.on("AcceptRequest", (data) => {
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("DeleteFriendShip", (data) => {
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("BlockFriend", (data) => {
      setNotification(data.userId + data.stats + data.blockedId);
    });

    socket.on("notifMessage", (data) => {
      setNotification(data.senderId + data.content + data.recieverId);
    });
    return () => {
      socket.off("friendRequest");
    };
  }, [notification]);
  /* ------------------------------------ - ----------------------------------- */
  return (
    friends && (
      <div className="wrapper">
        <p className="title">Achievements</p>
        <div className="xl:w-[932px] lg:w-[712px] s:w-[506px] w-[300px]">
          <div className="flex flex-wrap gap-x-[20px]">
            <div className="ml-[103px] relative">
              <Image src={_create_account} alt="ach" />
              <Image
                src={_create_account_gif}
                width={90}
                className="absolute top-[60px] left-[55px] "
                alt="ach"
              />
            </div>
            <div
              className={`relative mt-[-35px] s:mt-0 ${
                friends && (friends.length < 1) && "achievement_disabled"
              }`}
            >
              <Image src={_have_one_friend} alt="ach" />
              <Image
                src={_have_one_friend_gif}
                width={70}
                className="absolute  top-[60px] left-[65px]"
                alt="ach"
              />
            </div>
            <div className="relative achievement_disabled ml-[103px] s:ml-0 mt-[-35px] lg:mt-0">
              <Image src={_your_first_game} alt="ach" />
              <Image
                src={_your_first_game_gif}
                width={70}
                className="absolute  top-[70px] left-[60px]"
                alt="ach"
              />
            </div>
            <div
              className={`relative ${
                ((msgNum !== undefined) && msgNum < 1) && "achievement_disabled"
              } xl:mt-0 mt-[-35px]`}
            >
              <Image src={_send_first_msg} alt="ach" />
              <Image
                src={_send_first_msg_gif}
                width={90}
                className="absolute  top-[70px] left-[50px]"
                alt="ach"
              />
            </div>

            <div
              className={`relative ${
                friends && (friends.length < 19) && "achievement_disabled"
              } mt-[-35px] ml-[103px] lg:ml-0`}
            >
              <Image src={_19_friends} alt="ach" />
              <Image
                src={_19_friends_gif}
                width={70}
                className="absolute  top-[50px] left-[60px]"
                alt="ach"
              />
            </div>
            <div
              className={`relative ${
                ((msgNum !== undefined) && msgNum < 19) && "achievement_disabled"
              } mt-[-35px]`}
            >
              <Image src={_19_messages} alt="ach" />
              <Image
                src={_19_messages_gif}
                width={100}
                className="absolute  top-[60px] left-[50px]"
                alt="ach"
              />
            </div>
            <div className="relative achievement_disabled lg:ml-[103px] xl:ml-0 mt-[-35px] ml-[103px] s:ml-0">
              <Image src={_19_games} alt="ach" />
              <Image
                src={_19_games_gif}
                width={70}
                className="absolute  top-[60px] left-[60px]"
                alt="ach"
              />
            </div>
            <div className="relative achievement_disabled mt-[-35px] ">
              <Image src={_19_in_score} alt="ach" />
              <Image
                src={_19_in_score_gif}
                width={100}
                className="absolute  top-[50px] left-[50px]"
                alt="ach"
              />
            </div>

            <div
              className={`relative ${
                friends && (friends.length < 21) && "achievement_disabled"
              } xl:ml-[103px] ml-[103px] lg:ml-0 mt-[-35px]`}
            >
              <Image src={_21_friends} alt="ach" />
              <Image
                src={_21_friends_gif}
                width={80}
                className="absolute  top-[50px] left-[60px]"
                alt="ach"
              />
            </div>
            <div
              className={`relative ${
                ((msgNum !== undefined) && msgNum < 21) && "achievement_disabled"
              } mt-[-35px]`}
            >
              <Image src={_21_messages} alt="ach" />
              <Image
                src={_21_messages_gif}
                width={130}
                className="absolute top-[60px] left-[20px]"
                alt="ach"
              />
            </div>
            <div className="relative achievement_disabled mt-[-35px] ml-[103px] s:ml-0">
              <Image src={_21_games} alt="ach" />
              <Image
                src={_21_games_gif}
                width={50}
                className="absolute  top-[55px] left-[67px]"
                alt="ach"
              />
            </div>
            <div className="relative achievement_disabled mt-[-35px] ">
              <Image src={_21_in_score} alt="ach" />
              <Image
                src={_21_in_score_gif}
                width={80}
                className="absolute  top-[45px] left-[55px]"
                alt="ach"
              />
            </div>

            <div
              className={`relative ${
                friends && (friends.length < 24) && "achievement_disabled"
              } ml-[103px]  xl:ml-0 mt-[-35px]`}
            >
              <Image src={_42_friends} alt="ach" />
              <Image
                src={_42_friends_gif}
                width={140}
                className="absolute  top-[60px] left-[30px]"
                alt="ach"
              />
            </div>
            <div
              className={`relative ${
                ((msgNum !== undefined) && msgNum < 42) && "achievement_disabled"
              } mt-[-35px] `}
            >
              <Image src={_42_messages} alt="ach" />
              <Image
                src={_42_messages_gif}
                width={300}
                className="absolute  top-[46px] left-[-20px]"
                alt="ach"
              />
            </div>
            <div className="relative achievement_disabled mt-[-35px] ml-[103px] s:ml-0">
              <Image src={_42_games} alt="ach" />
              <Image
                src={_42_games_gif}
                width={80}
                className="absolute  top-[60px] left-[65px]"
                alt="ach"
              />
            </div>
            <div className="relative achievement_disabled mt-[-35px] ">
              <Image src={_42_in_score} alt="ach" />
              <Image
                src={_42_in_score_gif}
                width={150}
                className="absolute  top-[55px] left-[30px]"
                alt="ach"
              />
            </div>

            <div
              className={`relative ${
                friends && (friends.length < 1337) && "achievement_disabled"
              } mt-[-35px] xl:ml-[103px] ml-[103px] lg:ml-0`}
            >
              <Image src={_1337_friends} alt="ach" />
              <Image
                src={_1337_friends_gif}
                width={120}
                className={`absolute top-[60px] left-[40px]`}
                alt="ach"
              />
            </div>
            <div
              className={`relative ${
                ((msgNum !== undefined) && msgNum < 1337) && "achievement_disabled"
              } mt-[-35px] `}
            >
              <Image src={_1337_messages} alt="ach" />
              <Image
                src={_1337_messages_gif}
                width={50}
                className="absolute  top-[55px] left-[70px]"
                alt="ach"
              />
            </div>
            <div className="relative achievement_disabled mt-[-35px] lg:ml-[103px] xl:ml-0 ml-[103px] s:ml-0">
              <Image src={_1337_games} alt="ach" />
              <Image
                src={_1337_games_gif}
                width={57}
                className="absolute top-[45px] left-[65px]"
                alt="ach"
              />
            </div>
            <div className="relative achievement_disabled mt-[-35px]">
              <Image src={_1337_in_score} alt="ach" />
              <Image
                src={_1337_in_score_gif}
                width={80}
                className="absolute top-[55px] left-[60px]"
                alt="ach"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
