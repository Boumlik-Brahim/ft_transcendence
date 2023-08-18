"use client";
import { RootState } from "../../store/store";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function OnlineFriends() {
  const isCreateChannelPopUpOn = useSelector(
    (state: RootState) => state.createChannelPopUpToggle
  );

  return (
    <div
      className={`${
        isCreateChannelPopUpOn.createChannelPopUpToggled
          ? "blur-sm bg-gray-400"
          : ""
      } ${"w-[25%] h-screen bg-primary"} `}
    ></div>
  );
}
export default OnlineFriends;
