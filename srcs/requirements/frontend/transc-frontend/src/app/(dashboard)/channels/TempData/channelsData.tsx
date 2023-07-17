
export interface channelProps {
    id: number;
    bg_color: string;
    txt_color: string;
    channel_name: string;
    channel_owner: string;
    channel_members: number;
    channel_mode: string;
  }

export const channelsData: channelProps[] = [
    {
      id: 1,
      bg_color: "bg-channel-100",
      txt_color: "text-channel-300",
      channel_name: "Worriers",
      channel_owner: "Bilal Ben Aouad",
      channel_members: 130,
      channel_mode: "protected"
    },
    {
      id: 2,
      bg_color: "bg-channel-200",
      txt_color: "text-channel-400",
      channel_name: "Gamers Galore",
      channel_owner: "Jenna Smith",
      channel_members: 75,
      channel_mode: "Public"
    },
    {
      id: 3,
      bg_color: "bg-channel-100",
      txt_color: "text-channel-300",
      channel_name: "Gaming",
      channel_owner: "Alex Kim",
      channel_members: 210,
      channel_mode: "protected"
    },
    {
      id: 4,
      bg_color: "bg-channel-200",
      txt_color: "text-primary",
      channel_name: "Gamers kingdom",
      channel_owner: "Megan Lee",
      channel_members: 90,
      channel_mode: "Public"
    },
    {
      id: 5,
      bg_color: "bg-channel-100",
      txt_color: "text-channel-400",
      channel_name: "Game On",
      channel_owner: "Adam Chen",
      channel_members: 150,
      channel_mode: "protected"
    },
    {
      id: 6,
      bg_color: "bg-channel-200",
      txt_color: "text-primary",
      channel_name: "Valhalla",
      channel_owner: "Avery Johnson",
      channel_members: 50,
      channel_mode: "Public"
    },
    {
      id: 7,
      bg_color: "bg-channel-100",
      txt_color: "text-channel-300",
      channel_name: "Pong Ball",
      channel_owner: "Samantha Lee",
      channel_members: 95,
      channel_mode: "protected"
    },
    {
      id: 8,
      bg_color: "bg-channel-200",
      txt_color: "text-primary",
      channel_name: "Playground",
      channel_owner: "Jacob Brown",
      channel_members: 200,
      channel_mode: "Public"
    },
    {
      id: 9,
      bg_color: "bg-channel-100",
      txt_color: "text-channel-300",
      channel_name: "Gaming",
      channel_owner: "Lila Patel",
      channel_members: 120,
      channel_mode: "protected"
    },
    {
      id: 10,
      bg_color: "bg-channel-200",
      txt_color: "text-channel-400",
      channel_name: "flepara",
      channel_owner: "Gabriel Wong",
      channel_members: 80,
      channel_mode: "Public"
    }
  ];