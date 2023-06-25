
export default function InputText({type, holder}:{type:string, holder:string}){
return(
    <input placeholder={`${holder}`} type={`${type}`} className="w-full h-[37px] rounded-[3px] mb-[15px] pl-[22px]
        focus:outline-none 
        placeholder:font-bold placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[2px]"
    />
);
}