type apiResponse = {
    flags: {
        png: string,
        alt: string,
    },
    name: {
        common: string,
    }
}

export type countryInfo = {
    name: string,
    flagUrl: string
}

export async function getCountriesInfo() {
    const countries_api_url = "https://restcountries.com/v3.1/all?fields=name,flags";
    const response = await fetch(countries_api_url);
    const countriesUnfilteredInfo: apiResponse[] = await response.json();
    const countriesInfo: countryInfo[] = [];
    for (let countryInfo of countriesUnfilteredInfo) {
        countriesInfo.push({
            name: countryInfo.name.common,
            flagUrl: countryInfo.flags.png
        });
    }
    return countriesInfo;
}
