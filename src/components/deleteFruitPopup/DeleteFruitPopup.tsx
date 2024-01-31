import { FruitsTable } from "./FruitsTable";

type DeleteFruitPopupArguments = {
    opened: boolean;
    setOpened: Function;
};

export function DeleteFruitPopup({
    opened,
    setOpened,
}: DeleteFruitPopupArguments) {
    return (
        <div
            className="delete-fruit-popup__container"
            style={{ display: opened ? "flex" : "none" }}
        >
            <div className="delete-fruit-popup__content">
                <button
                    className="delete-fruit-popup-container__close-button"
                    onClick={() => setOpened(false)}
                ></button>
                <p className="delete-fruit-popup-container__title">
                    Delete Fruit
                </p>
                <FruitsTable />
            </div>
        </div>
    );
}
