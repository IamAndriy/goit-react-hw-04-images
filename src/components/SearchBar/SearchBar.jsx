import { useState } from "react";
import css from "./SearchBar.module.css";
import {ImSearch} from "react-icons/im";

export const SearchBar = ({onSubmit}) => {

    const [filter, setFilter] = useState("");

    const onFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(filter);
        setFilter("");
    }

    const onFilterChange = ({target}) => {
        setFilter(target.value);
    }

    return  <header className={css.Searchbar}>
        
                <form className={css.SearchForm} onSubmit={onFormSubmit}>

                    <button type="submit" className={css["SearchForm-button"]}>
                        <ImSearch className={css["SearchForm-button-icon"]}/>
                    </button>

                    <input
                        className={css["SearchForm-input"]}
                        type="text"
                        name="filter"
                        autoComplete="off"
                        autoFocus
                        value={filter}
                        onChange={onFilterChange}
                        placeholder="Search images and photos"
                    />
                </form>

            </header>
}