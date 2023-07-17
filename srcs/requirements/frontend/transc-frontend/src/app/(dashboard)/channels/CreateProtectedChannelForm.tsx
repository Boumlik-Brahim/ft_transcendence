"use client"
import Input from "./Input";

function CreateProtectedChannelForm(){
return(
    <>
        <h1 className="font-poppins font-bold text-base text-white  uppercase leading-6 tracking-wider mb-[25px] md:text-[25px]">
            Protected
        </h1>

        <Input
            holder="name"
            type="text"
        />
        <Input
            holder="password"
            type="password"
        />

        <button className="w-full text-white font-poppins font-semibold text-xs  leading-4 tracking-widest rounded-full  h-[37px] btn-background md:h-[43px] md:border-2">
            Create
        </button>
    </>
);
}
export default CreateProtectedChannelForm;