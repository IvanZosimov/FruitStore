import { countryInfo } from "../../helpers/countriesInfo";
import { Fruit } from "../../redux/fruitsSlice";
import { FruitCard } from "./FruitCard";

type FruitsGroupArguments = {
    countryInfo: countryInfo;
    fruits: Fruit[];
};

export function FruitsGroup({ countryInfo, fruits }: FruitsGroupArguments) {
    return (
        <div className="groups-container__group">
            <div className="groups-container__group__header">
                <img
                    className="groups-container__group__image"
                    src={countryInfo.flagUrl}
                    alt="flag of a country"
                />
                <p className="groups-container__group__country-name">
                    {countryInfo.name}
                </p>
            </div>
            {fruits.map((fruit) => (
                <FruitCard
                    fruitName={fruit.title}
                    fruitDescription={fruit.description}
                    fruitPrice={fruit.price.toString()}
                    imgSrc={fruit.image}
                    key={fruit.id}
                />
            ))}
        </div>
    );
}
