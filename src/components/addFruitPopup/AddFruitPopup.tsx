import { useState } from "react";
import { countryInfo } from "../../helpers/countriesInfo";
import { DropDownInput } from "../customInputs/DropDownInput";
import { IconPicker } from "../customInputs/IconPicker";
import { TextArea } from "../customInputs/TextArea";
import { TextInput } from "../customInputs/TextInput";
import { useDispatch } from "react-redux";
import { Fruit, addFruit } from "../../redux/fruitsSlice";
import { Tabs, tabs } from "../mainPage/FruitsDisplay";

type AddFruitPopupArguments = {
    countries: countryInfo[];
    opened: boolean;
    setOpened: Function;
};

export function AddFruitPopup({
    countries,
    opened,
    setOpened,
}: AddFruitPopupArguments) {
    const [tab, setTab] = useState<Tabs>(tabs[0]);
    const [country, setCountry] = useState<string>(countries[0].name);
    const [fruit, setFruit] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [iconPath, setIconPath] = useState<string>("");
    const [iconURL, setIconURL] = useState<string>("");
    const [fruitDescription, setFruitDescription] = useState<string>("");
    const dispatch = useDispatch();

    const requiredFieldsIds = ["fruit", "price", "description"];

    const sortedCountryNames = countries.map((country) => country.name).sort();

    function cleanForm() {
        setTab(tabs[0]);
        setCountry(countries[0].name);
        setFruit("");
        setPrice("");
        setIconPath("");
        setIconURL("");
        setFruitDescription("");
    }

    function onSave() {
        const fruitObject: Omit<Fruit, "id"> = {
            title: fruit,
            description: fruitDescription,
            price: Number(price),
            image: iconPath || iconURL,
            country: country,
            tab: tab,
        };

        dispatch(addFruit(fruitObject));
        setOpened(false);
    }

    function checkRequiredFields(): boolean {
        requiredFieldsIds.map((id) => {
            const element = document.getElementById(
                id
            ) as HTMLInputElement | null;
            if (element?.value !== "" && element?.value !== undefined) {
                element.style.border = "none";
                const errorMessageElement = document.querySelector(
                    `.${id}-error-message`
                );
                if (errorMessageElement) {
                    errorMessageElement.classList.add("hidden");
                }
            }
        });

        let errorOccurred = false;

        requiredFieldsIds.map((id) => {
            const element = document.getElementById(
                id
            ) as HTMLInputElement | null;
            if (element?.value === "") {
                element.style.border = "1px solid red";
                const errorMessageElement = document.querySelector(
                    `.${id}-error-message`
                );
                if (errorMessageElement) {
                    errorMessageElement.classList.remove("hidden");
                }
                errorOccurred = true;
            }
        });

        return errorOccurred;
    }

    if (!opened) {
        return null;
    }
    return (
        <div className="add-fruit-popup-container">
            <div className="add-fruit-popup">
                <p className="add-fruit-popup__title">Add Fruit</p>
                <form
                    className="add-fruit-popup__form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const errorOccurred = checkRequiredFields();

                        if (errorOccurred) {
                            return;
                        }
                        cleanForm();
                        onSave();
                    }}
                    noValidate
                >
                    <DropDownInput
                        id="type"
                        label="Tab:"
                        options={tabs}
                        selectedValue={tab}
                        setSelectedValue={setTab}
                        className="form__tab-dropdown"
                    />
                    <DropDownInput
                        id="country"
                        label="Country:"
                        options={sortedCountryNames}
                        selectedValue={country}
                        setSelectedValue={setCountry}
                        className="form__country-dropdown"
                    />
                    <TextInput
                        type="text"
                        id="fruit"
                        label="Fruit:"
                        placeholder=""
                        required={true}
                        setValue={setFruit}
                        className="form__fruit-input"
                    />
                    <TextInput
                        type="number"
                        id="price"
                        label="Price:"
                        placeholder=""
                        required={true}
                        setValue={setPrice}
                        className="form__price-input"
                    />
                    <IconPicker
                        id="iconPicker"
                        label="Icon:"
                        buttonText="upload icon"
                        iconPath={iconPath}
                        setIconPath={setIconPath}
                        className="form__icon-input"
                    />
                    <TextInput
                        type="text"
                        id="iconUrl"
                        label="Icon URL:"
                        placeholder="if you don't have local picture, please input icon URL."
                        required={false}
                        setValue={setIconURL}
                        className="form__icon-url-input"
                    />
                    <TextArea
                        id="description"
                        label="Description:"
                        required={true}
                        setValue={setFruitDescription}
                        className="form__textarea"
                    />
                    <div className="form__buttons-container popup-row-container">
                        <button
                            type="button"
                            className="form__buttons-container_cancel-button popup-button"
                            onClick={() => {
                                cleanForm();
                                setOpened(false);
                            }}
                        >
                            Cancel
                        </button>
                        <button className="form__buttons-save-button popup-button">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
