
import { increment, decrement } from "../../store/reducer";
import { useDispatch } from "react-redux";

export const Nav = () => {
    const disp = useDispatch();
    return (
        <div>
            <button onClick={() => {
                disp(increment());
            }}>increment</button>
            <button
                onClick={() => {
                    disp(decrement());
                }}
            >decrement</button>
            <h1>nav</h1>
        </div>
    )
}