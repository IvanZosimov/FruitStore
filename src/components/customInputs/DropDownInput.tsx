import { Select, MenuItem, InputLabel } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

type DropDownInputArguments = {
    options: readonly string[];
    selectedValue: string;
    setSelectedValue: Function;
    label: string;
    id: string;
    className: string;
};

export function DropDownInput({
    options,
    selectedValue,
    setSelectedValue,
    label,
    id,
    className,
}: DropDownInputArguments) {
    return (
        <StyledEngineProvider injectFirst>
            <div className={`${className}__container popup-row-container`}>
                <Select
                    labelId={id}
                    className={`${className}__selector dropdown-selector`}
                    value={selectedValue}
                    inputProps={{ IconComponent: () => null }}
                    MenuProps={{ disableScrollLock: true }}
                    onChange={(e) => setSelectedValue(e.target.value)}
                >
                    {options.map((optionItem) => {
                        return (
                            <MenuItem
                                value={optionItem}
                                className={`${className}__selector__option dropdown-option`}
                                key={optionItem}
                            >
                                {optionItem}
                            </MenuItem>
                        );
                    })}
                </Select>
                <InputLabel
                    id={id}
                    className={`${className}__label popup-option-label`}
                >
                    {label}
                </InputLabel>
            </div>
        </StyledEngineProvider>
    );
}
