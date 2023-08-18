export interface users_int
{
    id: string;
    name: string;
    email: string;
    IntraId: string;
    Avatar: string;
    status: string;
    created_at: string;
}
export interface notif
{
    id: string;
    name: string;
    Avatar: string;
    status: string;
    created_at: Date;
}

export interface SearchProps {
    user: users_int;
}

export interface friendShip
{
    friendShipStatus: string;
    userId: string;
    friendId: string;
    created_at: Date;
}

export interface blockedUser
{
    userId: string;
    blockedUserId: string;
}

export interface userStat
{
    winsNumbr: number;
    lossesNumbr: number;
    rate: number;
}

export interface history 
{
    id: string;
    playerA_Score: number;
    playerB_Score: number;
    created_at: string;
    playerA_id: string;
    playerB_id: string;
}

export interface opponents 
{
    playerA_Score: number;
    playerB_Score: number;
    playerA_name: string;
    playerA_Avatar: string;
    playerB_name: string;
    playerB_Avatar: string;
}

export interface MessageData 
{
    content: string;
    senderId: string;
    recieverId: string;
    roomId: string;
}

export interface notifMessage 
{
    user: users_int;
    numberOfMsg: number;
    content: string;
}
export interface leaders_list 
{
    user: users_int;
    rate: number;
    winsNumbr: number;
    lossesNumbr: number;
}

// export function getOpponents(
//     history: history[],
//     userId: string
//   ): opponents[] | null {
//     const [opponents, setOpponents] = useState<users_int[] | null>(null);
//     const [profileUser, setProfileUser] = useState<users_int>();
//     const historyGame: opponents[] = [];
//     //  const playeRankMap: Map<string, leaders_list> = new Map();;
  
//     useEffect(() => {
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get(
//             `http://127.0.0.1:3000/users/${userId}`
//           );
//           setProfileUser(response.data);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       fetchUser();
//     }, [userId]);
  
//     useEffect(() => {
//       const opponentId = history.map((h) => {
//         return userId === h.playerA_id ? h.playerB_id : h.playerA_id;
//       });
  
//       const fetchUsers = async () => {
//         try {
//           const userResponses = await Promise.all(
//             opponentId.map((id) => axios.get(`http://127.0.0.1:3000/users/${id}`))
//           );
  
//           const op = userResponses.map((response) => response.data);
//           setOpponents(op);
  
//           console.log("opponents[index] >>> ",op);
  
  
//           let holder: opponents;





//           history.map((h, index) => {
//             if (op[index] && profileUser){

//               if (h.playerA_id === op[index].id) {
//                 console.log("IF");
//                 holder = {
//                   playerA_name: profileUser.name,
//                   playerA_Avatar: profileUser.Avatar,
//                   playerA_Score: history[index].playerB_Score,
//                   playerB_name: op[index].name,
//                   playerB_Avatar: op[index].Avatar,
//                   playerB_Score: history[index].playerA_Score,
//                 };
//               } else {
//                 console.log("ELSE");
//                 holder = {
//                   playerA_name: profileUser.name,
//                   playerA_Avatar: profileUser.Avatar,
//                   playerA_Score: history[index].playerA_Score,
//                   playerB_name: op[index].name,
//                   playerB_Avatar: op[index].Avatar,
//                   playerB_Score: history[index].playerB_Score,
//                 };
//               }
//               console.log("holder", holder);
//               historyGame.push(holder);
//             }
//           });
//         } catch (error) {
//           console.log(error);
//           setOpponents([]);
//         }
//       };
  
//       if (opponentId.length > 0) {
//         fetchUsers();
//       } else {
//         setOpponents([]);
//       }
//     }, [history]);
  
//     console.log("historyGame ??????", historyGame);
//     return historyGame;
//   }