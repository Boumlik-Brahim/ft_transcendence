"use client"

function Input({ type, holder }: { type: string, holder: string }) {
    return (
        <input placeholder={`${holder}`} type={`${type}`} className="w-full h-[37px] text-primary-900 text-xs tracking-wide	font-poppins font-bold rounded-[3px] mb-[15px] pl-[22px]
        focus:outline-none 
        placeholder:font-poppins placeholder:font-bold placeholder:text-light-900 placeholder:text-xs 
        md:h-[45px]
        "
        />
    )
}
export default Input;