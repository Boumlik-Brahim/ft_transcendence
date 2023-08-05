"use client"

interface inputProps{
    type: string, 
    holder: string,
    name: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type, holder,name,label,value,onChange }: inputProps) {
    return (
        <input placeholder={`${holder}`} type={`${type}`} className="w-full h-[37px] text-primary-900 text-xs tracking-wide	font-poppins font-bold rounded-[3px] mb-[15px] pl-[22px]
        focus:outline-none 
        placeholder:font-poppins placeholder:font-bold placeholder:text-light-900 placeholder:text-xs 
        md:h-[45px]
        "
            name={name} 
            value={value} 
            onChange={onChange}
        />
    )
}
export default Input;