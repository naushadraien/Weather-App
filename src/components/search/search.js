import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoAPIUrl, geoAPIOptions } from '../api';

//Here search.js is only for searching the cities for latitude, londitude and country code and this is all the code for search,js file

//here onSearchChange function is passed for searching the data
const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);
    const loadOptions = (inputValue) => {
        //here after return we cut the code from fetch to .catch function from api.js
        //here ` ` is used for making the variable in js and ${} are variables inside that curly braces
        return fetch(`${geoAPIUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoAPIOptions)
            .then(response => response.json())
            .then(response => {
                return{
                    options: response.data.map((city)=>{
                        return {
                            //this is the format for searching the cities for avoiding the loadOptions error in consle
                            value: `${city.latitude} ${city.longitude}`, 
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }
    //here handleOnchange takes search data for which we are searching for
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
        
    }
    return (
        //Here debounceTimeout={600}  a debounce function makes sure that our code is only triggered once per user input after 600ms the user get the data if he is typing fast for cities to get the weather data
        // loadOptions is used for loading the options as if we search london then the user can only type the lond to get all the search options for london as user input the city which is async
        <AsyncPaginate placeholder="Search for city" debounceTimeout={600} value={search} onChange={handleOnChange} loadOptions ={loadOptions } />
    )
}

export default Search;