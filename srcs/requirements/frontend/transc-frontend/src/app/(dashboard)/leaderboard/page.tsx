import Friendsbar from '../../../../components/Friendsbar'

function page() {
  return (
    <div className="w-full h-[90vh] md:h-screen flex">
      <div className="flex-1">leaderboard</div>
      <Friendsbar />
    </div> 
  )
}

export default page