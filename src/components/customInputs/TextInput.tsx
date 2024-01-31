type TextInputArguments = {
    label: string;
    id: string;
    type: React.HTMLInputTypeAttribute;
    placeholder: string;
    setValue: Function;
    className: string;
    required: boolean;
};

export function TextInput({
    label,
    id,
    type,
    placeholder,
    required,
    setValue,
    className,
}: TextInputArguments) {
    return (
        <>
            <div className={`${className}__container popup-row-container`}>
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className={`${className}__container__input popup-text-input`}
                    onChange={(e) => setValue(e.target.value)}
                />
                <label
                    htmlFor={id}
                    className={`${className}__container__label popup-option-label`}
                >
                    {label}
                </label>
            </div>
            {required && (
                <p className={`${id}-error-message hidden`}>
                    * this field is required!
                </p>
            )}
        </>
    );
}
