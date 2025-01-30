import { Component } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { nanoid } from "nanoid";
import {SearchBar} from "../SearchBar/SearchBar";
import {ImageGallery} from "../ImageGallery/ImageGallery";
import { Modal } from "components/Modal/Modal";
import css from "./App.module.css";

const initialState = {
    filter: "",
    isModalOpen: false,
    image: {
        src: "",
        alt: ""
    },
    isLoading: false
}

export class App extends Component {

    state = {
        ...initialState,
    };    

    onSubmit = (value) =>{
        if (!value.trim()){
            alert("The request is empty!");
        }
        this.setState({filter: value});
    }

    onGalleryClick = ({src, alt}) => {
        
        this.setState({image: { src, alt },
                       isModalOpen: true,
                      });
    }

    toggleModal = () => {
        this.setState( { isModalOpen : !this.state.isModalOpen } );
    }

    render (){

        const {isModalOpen, image, filter} = this.state;
        const {onSubmit, onGalleryClick, toggleModal} = this;
        
        return  <div className={css.App}>
                  <SearchBar onSubmit={onSubmit} />
                  <ImageGallery filter={filter} onGalleryClick={onGalleryClick}/>
                  {isModalOpen && <Modal onClose={toggleModal} image={image}/>}
                </div>
    }
}

