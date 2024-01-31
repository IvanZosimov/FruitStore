import { useDispatch } from "react-redux";
import alertSign from "../../static/alert-sign.svg";
import { removeFruit } from "../../redux/fruitsSlice";
import { CSSProperties } from "react";

type QuestionModalArguments = {
    coordinates: number[];
    opened: boolean;
    setOpened: Function;
    fruitId: number;
};

export function QuestionModal({
    coordinates: [x, y],
    opened,
    setOpened,
    fruitId,
}: QuestionModalArguments) {
    const dispatch = useDispatch();

    const modalContainerXOffset = 100;
    const modalContainerYOffset = 150;
    const modalContainerStyle: CSSProperties = {
        position: "fixed",
        top: x - modalContainerXOffset || 0,
        left: y - modalContainerYOffset || 0,
        display: opened ? "block" : "none",
    };

    return (
        <div className="modal-container" style={modalContainerStyle}>
            <div className="modal-text-container">
                <img className="modal-message-prefix" src={alertSign} alt="" />
                <p className="modal-message">
                    Are you sure to delete this Fruit?
                </p>
            </div>
            <div className="modal-buttons-container">
                <button
                    className="modal-buttons-container__cancel-button modal-button"
                    onClick={() => {
                        setOpened(false);
                    }}
                >
                    Cancel
                </button>
                <button
                    className="modal-buttons-container__ok-button modal-button"
                    onClick={() => {
                        dispatch(removeFruit(fruitId));
                        setOpened(false);
                    }}
                >
                    OK
                </button>
            </div>
        </div>
    );
}
