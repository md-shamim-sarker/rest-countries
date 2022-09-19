const loadCountries = region => {
    const options = {method: 'GET'};
    fetch(`https://restcountries.com/v3.1/region/${region}`, options)
        .then(response => response.json())
        .then(response => displayCountries(response))
        .catch(err => console.error(err));
};

const loadAllCountries = () => {
    const options = {method: 'GET'};
    fetch(`https://restcountries.com/v3.1/all`, options)
        .then(response => response.json())
        .then(response => displayCountries(response))
        .catch(err => console.error(err));
};

const displayCountries = countries => {
    const countryCount = document.getElementById("country-count");
    const count = document.getElementById("count");
    countryCount.classList.remove("display-none");
    count.innerText = countries.length;
    const countriesHTML = countries.map(country => getCountryHTML(country));
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML.join(' ');
    toggleSpinner(false);
};

const languagesFunc = obj => {
    const arr = Object.values(obj);
    return arr.join(", ");
};

const getCountryHTML = ({flags, name, subregion, capital, independent, unMember, area, population, timezones, landlocked}) => {
    return `
        <div class="country">
            <div class="flag">
                <img src="${flags.svg}" alt="flags">
            </div>
            <div class="details">
                <h2>${name.common}</h2>
                <p>
                    <span>Sub-Region: ${subregion}</span><br>
                    <span>Capital: ${capital}</span><br>
                    <span>Area: ${area}</span><br>
                    <span>Population: ${population}</span><br>
                    <span>Independent: ${independent ? "Yes" : "No"}</span><br>
                    <span>UN Membership: ${unMember ? "Yes" : "No"}</span><br>
                    <span>Landlocked: ${landlocked ? "Yes" : "No"}</span><br>
                </p>
            </div>
        </div>
    `;
};

document.getElementById('search-btn').addEventListener("click", event => {
    document.getElementById("countries").innerHTML = "";
    toggleSpinner(true);
    const region = document.getElementById("regionId").value;
    if(region !== "select" && region !== "all") {
        loadCountries(region);
    };
    if(region === "all") {
        loadAllCountries();
    }
});

loadAllCountries();

const toggleSpinner = isSpin => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if(isSpin) {
        loadingSpinner.classList.remove("display-none");
    } else {
        loadingSpinner.classList.add("display-none");
    }
};