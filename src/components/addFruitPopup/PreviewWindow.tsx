import previewIcon from "../../static/preview-icon.png";

type PreviewWindowArguments = {
    fileLink: string | null;
    className: string;
};

export function PreviewWindow({ fileLink, className }: PreviewWindowArguments) {
    const previewContainerClassName = fileLink
        ? "fruit-card-container__image-container"
        : "";

    const previewImageClassName = fileLink
        ? "fruit-card-container__image-container__image"
        : `${className}__picture`;

    return (
        <div className={`${className}`}>
            <div className={previewContainerClassName}>
                <img
                    className={previewImageClassName}
                    src={fileLink ? fileLink : previewIcon}
                    alt="preview"
                />
            </div>
            {!fileLink && (
                <p className={`${className}__description`}>icon preview</p>
            )}
        </div>
    );
}
