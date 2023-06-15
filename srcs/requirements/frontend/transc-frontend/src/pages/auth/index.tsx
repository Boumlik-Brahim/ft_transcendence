import { useSelector } from "react-redux"
import { initialvalueType } from "../../store/reducer"


export const Auth  = () => {
    const value : number = useSelector((state : initialvalueType) => state.value);
    return (
        <div>
            <h1>Auth</h1>
            <p>{value}</p>
        </div>
    )
}