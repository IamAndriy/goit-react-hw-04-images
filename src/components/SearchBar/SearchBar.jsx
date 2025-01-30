import { Component } from "react";
import css from "./SearchBar.module.css";
import {ImSearch} from "react-icons/im";

const initialState = {
    filter : ""
}

export class SearchBar extends Component {

    state = {
        ...initialState
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.filter);
        this.setState({filter: ""});
    }

    onFilterChange = ({target}) => {
        this.setState({filter : target.value});
    }

    render(){
        
        const {filter} = this.state;
        const {onFormSubmit, onFilterChange} = this;

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
}