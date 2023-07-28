import Friendsbar from '../../../../components/Friendsbar'

function loading() {
  return (
    <div className="layouts">
      <div className="my_container loading_animation">
        <div className="wrapper relative rounded-2xl">
          <p className=" bg-slate-100 w-[350px] h-[50px] self-start rounded-2xl"></p>
          <div className="md:block absolute right-[0px] top-[0px] hidden w-[50px] h-[50px] bg-slate-100 rounded-2xl"></div>
          <div className="bg-slate-100 flex flex-col gap-[30px] items-center justify-center w-[200px] xs:w-[300px] md:w-[400px] rounded-2xl px-[1rem] py-[1rem] xs:py-[3rem]">
            <div className="w-[200px] h-[200px] rounded-full loading_animtion"></div>
            <div className="flex flex-col items-center gap-[10px] w-[80%]">
              <div className='flex xs:justify-between justify-center w-full items-center loading_animtion bg-slate-200 h-[40px] rounded-2xl'></div>
              <div className='flex xs:justify-between justify-center w-full items-center loading_animtion bg-slate-200 h-[40px] rounded-2xl'></div>
            </div>
          </div>
        </div>

        <div className="wrapper relative">
          <p className=" bg-slate-100 w-[350px] h-[50px] self-start rounded-2xl"></p>
          <ul className="w-full flex gap-[10px] flex-wrap">
            <li className="w-[150px] h-[50px] bg-slate-200 rounded-2xl loading_animtion"></li>
            <li className="w-[150px] h-[50px] bg-slate-200 rounded-2xl loading_animtion"></li>
            <li className="w-[150px] h-[50px] bg-slate-200 rounded-2xl loading_animtion"></li>
            <li className="w-[150px] h-[50px] bg-slate-200 rounded-2xl loading_animtion"></li>
          </ul>
        </div>

        <div className="wrapper relative">
          <p className="bg-slate-100 w-[350px] h-[50px] self-start px-[2rem] rounded-2xl"></p>
          <ul className="w-full flex flex-col gap-[20px] flex-wrap">
            <li className="w-full h-[70px] bg-slate-200 rounded-full loading_animtion"></li>
            <li className="w-full h-[70px] bg-slate-200 rounded-full loading_animtion"></li>
          </ul>
        </div>
      </div>
      <Friendsbar />
    </div>
  )
}

export default loading