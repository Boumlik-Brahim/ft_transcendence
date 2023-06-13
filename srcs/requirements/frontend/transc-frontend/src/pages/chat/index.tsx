
interface Pic {
    src : string;
    alt : string;
}
const unsplashimg: Pic = {
    src: 'https://source.unsplash.com/1600x900/?men',
    alt: 'random unsplash image'
  };

export const Chat  = () => {
    return (
        // <div className=" grid grid-rows-[10fr,90fr] h-screen ">
        //    <div className=" flex items-center bg-primary-300 text-primary-900 justify-between pl-2 pr-5">
        //         <div>
        //             <img src={unsplashimg.src} alt={unsplashimg.alt}  className="w-[50px] h-[50px] rounded-full  object-cover"/>
        //             <p className="sm:text-red-500">Messages</p>
        //         </div>
        //         <div>
        //             <p>search</p>
        //         </div>
        //     </div>
        //    <div className=" ">
        //         <p>pic + title + search</p>
        //    </div>
        // </div>
        // <div className="border-2 border-black  h-[90vh] md:h-[100vh] w-screen overflow">
        //         <div className="border-2 border-red-600">

        //         </div>                
        // </div>
        <div className=" h-[90vh] md:h-[100vh] bg-red-300 " >

        </div>
    )
}