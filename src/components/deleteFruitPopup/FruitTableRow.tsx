import { useState } from "react";
import { Fruit } from "../../redux/fruitsSlice";
import { QuestionModal } from "./QuestionModal";

type FruitTableRowArguments = {
    fruitInfo: Fruit;
};

export function FruitTableRow({ fruitInfo }: FruitTableRowArguments) {
    const [[x, y], setCoordinates] = useState<number[]>([]);
    const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

    function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setCoordinates([e.clientX, e.clientY]);
        setDeleteClicked(true);
    }

    return (
        <tr className="fruit-table__row">
            <td className="fruit-table__cell">{fruitInfo.tab}</td>
            <td className="fruit-table__cell">{fruitInfo.country}</td>
            <td className="fruit-table__cell">{fruitInfo.title}</td>
            <td className="fruit-table__cell">
                <button className="fruit-table__button" onClick={handleDelete}>
                    Delete
                </button>
                <QuestionModal
                    coordinates={[y, x]}
                    opened={deleteClicked}
                    setOpened={setDeleteClicked}
                    fruitId={fruitInfo.id}
                />
            </td>
        </tr>
    );
}
