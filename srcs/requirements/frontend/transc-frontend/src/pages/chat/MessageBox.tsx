

export default function MessageBox() {

    return (
<>  
<div className="border-[1px] border-blue-600 flex flex-col items-center gap-[0] mb-[3px]">
        
                <p className=" relative top-[9%] ">Name 08-02-2023</p>
    <div className="border-[1px] border-cyan-600 p-[10px] relative flex w-[250px] justify-start">
            <div className="mt-[10px] ml-[5px] bg-slate-400 w-full min-h-[176px] flex gap-[5px] items-start pl-[30px] mb-[10px] ">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati inventore aperiam aspernatur eos ducimus est suscipit sequi!</p>
                </div>
            <img src="/imgs/profile.png" alt="profilePic"  className="absolute top-0 left-0 w-[40px] h-[40px] "/>

    </div>
</div>
</>
    );


}