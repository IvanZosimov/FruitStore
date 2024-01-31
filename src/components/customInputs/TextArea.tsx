type TextAreaArguments = {
    label: string;
    id: string;
    required: boolean;
    setValue: Function;
    className: string;
};

export function TextArea({
    label,
    id,
    required,
    className,
    setValue,
}: TextAreaArguments) {
    return (
        <>
            <div className={`${className}__container`}>
                <textarea
                    id={id}
                    required={required}
                    className={`${className}__container__textarea`}
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
