import { useDispatch, useSelector } from 'react-redux';
import { createChannelOn, showPopUp } from '../../store/reducer';

import { RootState } from '../../store/store';

import { useMediaQuery } from "@react-hook/media-query"


export default function ChannelBarInfo({title, btn_visibility: btn_visibility} : {title:string, btn_visibility:string}) {
    const dispatch = useDispatch();
    const currentPopUpStatus = useSelector((state: RootState) => state.togglePopUp);

    const isLgScreen = useMediaQuery('(min-width: 1230px)');
    const handleCreateChannelToggleOn = () => {
        const rs = isLgScreen;
        switch(rs) {
            case true:
                dispatch(showPopUp());
              break;
            case false:
                dispatch(createChannelOn());
                console.log('Not')
              break;
            default:
                dispatch(createChannelOn());
          }
        //     dispatch(createChannelOn());
        // else if (isLgScreen)
        //     dispatch(showPopUp());
          console.log(currentPopUpStatus);
    }


return (
<>

        <div className="h-[80%] flex items-center justify-between px-[5px] mb-[-8px]  lg:mb-0  lg:h-[90%]">
            <div className="font-poppins text-xs font-bold tracking-wider uppercase text-primary-900">
                {title}
            </div>
            <button
                className={`w-[60px] h-[25px] bg-primary-900 rounded-full font-poppins text-white text-[11px] font-semibold  flex items-center justify-center ${btn_visibility}   md:w-[70px] md:h-[35px] lg:h-[30px]   `}
                onClick={handleCreateChannelToggleOn}
            >
                Create
            </button>
        </div>
        <hr className="border-t-2  border-primary-900 " />

</>
);
}
        // <div className={`w-full h-[30%] px-[5%]  bg-cyan-400 `}>
        //     <div className={`flex justify-between items-center h-[80%] md:h-[50%] lg:h-[40%] `}>
        //         <h1 className={`w-[120px] h-0 pl-[8px] font-poppins text-[13px] text-primary-900 font-bold  tracking-wider  leading-17 uppercase`}>
        //             {title}
        //         </h1>
        //         <button className={`mr-[8px] h-[30px] w-[60px] bg-primary-900 text-white rounded-full font-poppins text-xs font-bold  mb-[-12px] ${btn_visibility} flex items-center justify-center md:h-[35px] md:w-[65px]`} onClick={handleCreateChannelToggleOn}>
        //             <span className='font-poppins text-[11px] text-white font-bold  '>Create</span>
        //         </button>
        //     </div>
        //     <hr className={`border-t-2 border-primary-900  w-full mt-[-9px] md:mt-[-5px]`} />
        // </div>