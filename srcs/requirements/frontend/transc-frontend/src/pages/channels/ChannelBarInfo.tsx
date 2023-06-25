import { useDispatch } from 'react-redux';
import { createChannelOn } from '../../store/reducer';

export default function ChannelBarInfo({title, btn_visibility: btn_visibility} : {title:string, btn_visibility:string}) {
    const dispatch = useDispatch();
    const handleCreateChannelToggleOn = () => {
        dispatch(createChannelOn());
    }
    return (

        <div className={`w-full h-[30%] px-[5%]`}>
            <div className={`flex justify-between items-center h-[80%]`}>
                <h1 className={`w-[120px] h-0 pl-[8px] font-poppins text-[13px] text-primary-900 font-bold  tracking-wider  leading-17 uppercase`}>
                    {title}
                </h1>
                <button className={`mr-[8px] h-[40%] w-[70px] bg-primary-900 text-white rounded-full font-poppins text-xs font-bold  mb-[-15px] ${btn_visibility}`} onClick={handleCreateChannelToggleOn}>
                    Create
                </button>
            </div>
            <hr className={`border-t-2 border-primary-900  w-full mt-[-9px]`} />
        </div>

    );
}