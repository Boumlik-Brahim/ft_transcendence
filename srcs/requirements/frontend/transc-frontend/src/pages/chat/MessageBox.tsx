

export default function MessageBox() {

    return (
<>  
<div className=" flex flex-col items-start ">
        
                <p className="relative top-[20%] left-[18%] w-[280px] flex items-center">
                    <div className="font-poppins font-bold text-[11px] leading-5 mr-2 text-primary-900 max-w-[120px]  truncate">Billaaa Ben Aouad aa</div> 
                    <span className="font-normal tracking-wider text-[8px] leading-4">08/06/2023 09:19
                    </span>
                    </p>
    <div className=" p-[10px] relative flex w-[280px] justify-start">
            <div className="mt-[10px] ml-[5px] bg-slate-200 w-full max-h-[176px] flex gap-[5px] items-start pl-[25px]   pt-[10px]">
            <p className="pb-[7px]">slm cv !</p>
                </div>
            <img src="/imgs/profile.png" alt="profilePic"  className="absolute top-0 left-0 w-[40px] h-[40px] "/>

    </div>
</div>

</>
);


}