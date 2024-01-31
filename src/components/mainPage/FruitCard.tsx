type FruitCardArguments = {
    imgSrc: string;
    fruitName: string;
    fruitDescription: string;
    fruitPrice: string;
};

export function FruitCard({
    imgSrc,
    fruitName,
    fruitDescription,
    fruitPrice,
}: FruitCardArguments) {
    return (
        <div className="fruit-card-container">
            <div className="fruit-card-container__image-container">
                <img
                    className="fruit-card-container__image-container__image"
                    src={imgSrc}
                    alt=""
                />
            </div>
            <div className="fruit-card-container__info-container">
                <p className="fruit-card-container__name">{fruitName}</p>
                <p className="fruit-card-container__description">
                    {fruitDescription}
                </p>
                <p className="fruit-card-container__price">{`$ ${fruitPrice}`}</p>
            </div>
        </div>
    );
}
