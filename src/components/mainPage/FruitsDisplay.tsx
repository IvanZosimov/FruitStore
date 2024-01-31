import { FruitsGroup } from "./FruitsGroup";
import { Fruit } from "../../redux/fruitsSlice";
import { useLayoutEffect, useRef, useState } from "react";
import { countryInfo } from "../../helpers/countriesInfo";

export const tabs = ["Hot", "New", "Recommend", "All"] as const;

export type Tabs = (typeof tabs)[number];

type GroupedFruits = {
    [key: string]: Fruit[];
};

type FruitsDisplayArguments = {
    countries: countryInfo[];
    fruits: Fruit[];
};

function toggleSelectedTab(
    selectedTab: Tabs,
    existingTabs?: HTMLButtonElement[]
) {
    if (existingTabs) {
        const iterableTabs = Array.from(existingTabs) as HTMLButtonElement[];
        for (let tab of iterableTabs) {
            tab.classList.remove("active");
            if (tab.innerText === selectedTab) {
                tab.classList.toggle("active");
            }
        }
    }
}

function filterFruitsByTab(tab: Tabs, fruits: Fruit[]) {
    return fruits.filter((fruit) => {
        if (tab === "All") {
            return true;
        }
        return tab === fruit.tab;
    });
}

function groupFruitsByCountry(fruits: Fruit[]): GroupedFruits {
    const groupedFruits: GroupedFruits = {};
    for (const fruit of fruits) {
        const fruitCountry = fruit.country;
        if (Object.hasOwn(groupedFruits, fruitCountry)) {
            groupedFruits[fruitCountry].push(fruit);
        } else {
            groupedFruits[fruitCountry] = [fruit];
        }
    }
    return groupedFruits;
}

export function FruitsDisplay({ countries, fruits }: FruitsDisplayArguments) {
    const [tabState, setTabState] = useState<Tabs>("Hot");
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let selectedTab: (typeof tabs)[number] = "Hot";
        for (let tab of tabs) {
            const tabFruits = fruits.filter((fruit) => tab === fruit.tab);
            if (tabFruits.length) {
                selectedTab = tab;
                break;
            }
        }

        const existingTabs = ref.current?.children as
            | HTMLButtonElement[]
            | undefined;
        toggleSelectedTab(selectedTab, existingTabs);
        setTabState(selectedTab);
    }, [fruits]);

    const fruitsFilteredByTab = filterFruitsByTab(tabState, fruits);

    const fruitsGroupedByCountries: GroupedFruits =
        groupFruitsByCountry(fruitsFilteredByTab);

    function handleTabCLick(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        const selectedTab = e.currentTarget.innerText as (typeof tabs)[number];
        const existingTabs = ref.current?.children as
            | HTMLButtonElement[]
            | undefined;
        toggleSelectedTab(selectedTab, existingTabs);
        setTabState(selectedTab);
    }

    return (
        <>
            <div className="fruit-list__tabs-container" ref={ref}>
                <button className="fruit-list__tab" onClick={handleTabCLick}>
                    Hot
                </button>
                <button className="fruit-list__tab" onClick={handleTabCLick}>
                    New
                </button>
                <button className="fruit-list__tab" onClick={handleTabCLick}>
                    Recommend
                </button>
                <button className="fruit-list__tab" onClick={handleTabCLick}>
                    All
                </button>
            </div>
            <div className="fruit-list__groups-container">
                {Object.entries(fruitsGroupedByCountries).map((group) => {
                    const [countryName, fruits] = group;
                    let countryInfo = countries.find(
                        (country) => country.name === countryName
                    );
                    if (!countryInfo) {
                        countryInfo = {
                            name: countryName,
                            flagUrl:
                                "https://www.shiplocation.com/Flags%20-%20normal/uu.png",
                        };
                    }
                    return (
                        <FruitsGroup
                            countryInfo={countryInfo}
                            fruits={fruits}
                            key={countryName}
                        />
                    );
                })}
            </div>
        </>
    );
}
