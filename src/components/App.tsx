import { FruitsDisplay } from "./mainPage/FruitsDisplay";
import { countryInfo, getCountriesInfo } from "../helpers/countriesInfo";
import { useLayoutEffect, useState } from "react";
import { AddFruitPopup } from "./addFruitPopup/AddFruitPopup";
import { createPortal } from "react-dom";
import { DeleteFruitPopup } from "./deleteFruitPopup/DeleteFruitPopup";
import { Fruit } from "../redux/fruitsSlice";
import { useStore } from "react-redux";
import { RootState } from "../redux/store";

export function App() {
    const store = useStore();
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [countries, setCountries] = useState<countryInfo[]>([]);
    const [deletePopupOpened, setDeletePopupOpened] = useState<boolean>(false);
    const [addPopupOpened, setAddPopupOpened] = useState<boolean>(false);

    useLayoutEffect(() => {
        getCountriesInfo().then((res) => {
            setCountries(res);
        });
    }, []);

    return (
        <>
            <header className="fruit-store-header">
                <h1 className="fruit-store-header__title">Fruit Store</h1>
                <nav className="fruit-store-header__navigation">
                    <button
                        className="fruit-store-header__navigation__button"
                        onClick={() => {
                            const state = store.getState() as RootState;
                            setFruits(state.fruits.fruits);
                        }}
                    >
                        Load
                    </button>
                    <button
                        className="fruit-store-header__navigation__button"
                        onClick={() => {
                            setAddPopupOpened(true);
                        }}
                    >
                        Add
                    </button>
                    <button
                        className="fruit-store-header__navigation__button"
                        onClick={() => {
                            setDeletePopupOpened(true);
                        }}
                    >
                        Delete
                    </button>
                </nav>
            </header>
            <main className="fruit-list">
                <p className="fruit-list__title">Fruit List</p>
                <FruitsDisplay countries={countries} fruits={fruits} />
            </main>
            {countries.length > 0 &&
                createPortal(
                    <AddFruitPopup
                        countries={countries}
                        opened={addPopupOpened}
                        setOpened={setAddPopupOpened}
                    />,
                    document.body
                )}
            {createPortal(
                <DeleteFruitPopup
                    opened={deletePopupOpened}
                    setOpened={setDeletePopupOpened}
                />,
                document.body
            )}
        </>
    );
}
