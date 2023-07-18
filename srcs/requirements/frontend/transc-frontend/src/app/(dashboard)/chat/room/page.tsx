"use client"

function Page() {
    return (
        <div className="w-full h-[85vh] md:h-screen flex ">
            <div className="w-full h-full bg-red-500">
                <div className="w-full h-[85%] bg-green-500 overflow-auto">

                    <div className="w-[90%] h-[110px] bg-white mx-[5%] flex">
                        <div className="w-[10%]">
                            <div className="w-[51px] h-[51px] bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="w-[90%] h-[59px] bg-orange-500"></div>
                    </div>


                </div>
                <div className="w-full h-[15%] bg-black"></div>
            </div>
        </div>
    )
}
export default Page;
