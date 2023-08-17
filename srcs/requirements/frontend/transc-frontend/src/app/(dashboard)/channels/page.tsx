"use client";
import ChannelBarInfo from "./ChannelBarInfo";
import ChannelBoxInfo from "./ChannelBoxInfo";
import CreateProtectedChannelForm from "./CreateProtectedChannelForm";
import CreatePrvPbcChannel from "./CreatePrvPbcChannel";
import CreateChannel from "./CreateChannel";
import CreateChannelLg from "./CreateChannelLg";
import OnlineFriends from "./OnlineFriends";
import Sidebar from "@/../components/Sidebar";

import Image from "next/image";
import { channelsData, channelProps } from "./TempData/channelsData";
import ChannelsList from "./ChannelsList";

import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useRef } from "react";
import { Socket, io } from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { RootState } from "@/app/store/store";
import { setCurrentUser } from "@/app/store/reducer";
import { useParams } from "next/navigation";
import Friendsbar from "../../../../components/Friendsbar";

function Page() {
  const channels = channelsData.map((channel: channelProps) => {
    return (
      <ChannelBoxInfo
        key={channel.id}
        id={channel.id}
        bg_color={channel.bg_color}
        txt_color={channel.txt_color}
        channel_name={channel.channel_name}
        channel_owner={channel.channel_owner}
        channel_members={channel.channel_members}
        channel_mode={channel.channel_mode}
      />
    );
  });
  const isMdScreen = useMediaQuery({ minWidth: 768 });
  const isLgScreen = useMediaQuery({ minWidth: 1200 });

  const [isMdScreenState, setIsMdScreen] = useState(false);
  const [isLgScreenState, setIsLgScreen] = useState(false);
  useEffect(() => {
    setIsMdScreen(isMdScreen);
    setIsLgScreen(isLgScreen);
  }, [isMdScreen, isLgScreen]);

  //^ ------------------------------------- socket Io ----------------------------------------
  const socket = useRef<Socket>();
  const dispatch = useDispatch();

  const cookies = new Cookies();
  const userIdFromCookie = cookies.get("id");
  dispatch(setCurrentUser(userIdFromCookie));
  //* useEffect for creating socket
  useEffect(() => {
    socket.current = io("ws://localhost:3000");
  }, []);
  //^ ----------------------------------------------------------------------------------------


    /* ------------------------- get url ID from url ------------------------- */
    const { userId } = useParams();
    /* ------------------------------------ - ----------------------------------- */

    /* --------------------------- get userSession ID --------------------------- */
    const [userSession, setUserSession] = useState<string>("");
    useEffect(() => {
        const cookies = new Cookies();
        setUserSession(cookies.get("id"));
    }, []);
    /* ------------------------------------ - ----------------------------------- */


  return (
    userSession && (
    <>
      <Sidebar />
      <div className="layouts">
        <div className="my_container relative">
          <div className="w-full h-[85vh]  md:h-screen flex flex-col ">
            {/*------------------------------------------------- create channel page for small devices ------------------------------------------------------------------ */}

            {!isLgScreenState && <CreateChannel />}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            <ChannelsList />

            {isLgScreenState && <CreateChannelLg />}
          </div>

        </div>
          {/*--------------------------------------------------------- side friend list------------------------------------------------------------------------------- */}
          {/* {isLgScreenState && <OnlineFriends />} */}
          <Friendsbar userId={userId} userSessionId={userSession} />
          {/*---------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      </div>
    </>
    )
  );
}

export default Page;
