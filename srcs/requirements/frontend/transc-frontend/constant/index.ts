import {
    profile_b, leaderboard_b, achivements_b, channels_b,
    friends_b, setting_b, play_b,
    profile_w, leaderboard_w, achivements_w, channels_w,
    friends_w, setting_w, play_w,
} from '@/../public'

import {
    avatar
} from '@/../public'


export const SideLinks = [
    { name: "profile", icon_b: profile_b, icon_w: profile_w },
    { name: "leaderboard", icon_b: leaderboard_b, icon_w: leaderboard_w },
    { name: "achievements", icon_b: achivements_b, icon_w: achivements_w },
    { name: "channels", icon_b: channels_b, icon_w: channels_w },
    { name: "friends", icon_b: friends_b, icon_w: friends_w },
    { name: "setting", icon_b: setting_b, icon_w: setting_w },
    { name: "game", icon_b: play_b, icon_w: play_w },
]

export const OnlineFriends = [
    { id: 1, name: "Oussama Belkhadir", avarat: avatar, status: "online" },
    { id: 2, name: "Oussama Belkhadir", avarat: avatar, status: "online" },
    { id: 3, name: "Oussama Belkhadir", avarat: avatar, status: "online" },
    { id: 4, name: "Oussama Belkhadir", avarat: avatar, status: "online" },
]

export const history_game = [
    {id: 1, oppenet: "mustafa rajawi", status:"win",avarat: avatar},
    {id: 2, oppenet: "ahmed boghtat", status:"lose",avarat: avatar},
    {id: 3, oppenet: "simo msfiwi", status:"win",avarat: avatar},
    {id: 3, oppenet: "haji zaki", status:"win",avarat: avatar},
]

export const leaderboard_list = [
    {id: 1, name: "mustafa rajawi", point:"100",avarat: avatar},
    {id: 2, name: "ahmed boghtat", point:"100",avarat: avatar},
    {id: 3, name: "simo msfiwi", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
    {id: 4, name: "haji zaki", point:"100",avarat: avatar},
]

export const PlayerFake = { name: "Oussama Belkhadir", avarat: avatar, status: "online", date : 'August, 7/23' }
