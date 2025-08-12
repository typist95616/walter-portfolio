import { useEffect, useState } from "react";
import "./PopUp.scss";

interface PopUpProps {
    popUpShow: boolean;
    setPopUpShow: (show: boolean) => void;
}

export default function PopUp(props: PopUpProps) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.popUpShow) {
            setTimeout( () => setShow(true), 10);
        } else {
            setShow(false);
        }
    }, [props.popUpShow])

    return (
        <div className={`popUp-root${show ? ' active' : ""}`}>
            <div>This is Pop up~</div>
            <div onClick={() => props.setPopUpShow(false)}>close</div>
        </div>
    )
}