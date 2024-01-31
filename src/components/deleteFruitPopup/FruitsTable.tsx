import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FruitTableRow } from "./FruitTableRow";

export function FruitsTable() {
    const fruits = useSelector((state: RootState) => state.fruits.fruits);

    if (!fruits.length) {
        return null;
    }

    return (
        <div className="scroll-window">
            <table className="fruit-table">
                <thead className="fruit-table__head">
                    <tr className="fruit-table__head-row">
                        <th className="fruit-table__header-cell">Tab</th>
                        <th className="fruit-table__header-cell">Country</th>
                        <th className="fruit-table__header-cell">Fruit</th>
                        <th className="fruit-table__header-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fruits.map((fruit) => (
                        <FruitTableRow fruitInfo={fruit} key={fruit.id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
