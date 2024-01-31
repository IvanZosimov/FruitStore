import { useRef } from "react";
import { PreviewWindow } from "../addFruitPopup/PreviewWindow";

type IconPickerArguments = {
    label: string;
    buttonText: string;
    id: string;
    iconPath: string;
    setIconPath: Function;
    className: string;
};

export function IconPicker({
    label,
    buttonText,
    id,
    iconPath,
    setIconPath,
    className,
}: IconPickerArguments) {
    const ref = useRef<HTMLInputElement>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setIconPath(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <div className={`${className}__container`}>
            <div className={`${className}__container__icon-upload`}>
                <PreviewWindow
                    className="preview-container"
                    fileLink={iconPath ? iconPath : null}
                />
                <input
                    type="button"
                    className={`${className}__container__icon-upload__button popup-button`}
                    value={buttonText}
                    onClick={() => ref.current?.click()}
                />
                <input
                    id={id}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    ref={ref}
                />
            </div>

            <label
                htmlFor={id}
                className={`${className}__container__label popup-option-label`}
            >
                {label}
            </label>
        </div>
    );
}
