import { useState } from "react";
import PropTypes from "prop-types";
import { SearchBar } from "../SearchBar/SearchBar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Modal } from "components/Modal/Modal";

export const App = () => {

    const [filter, setFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState({src: "", alt: ""});

    const onSubmitHandle = (value) =>{
        if (!value.trim()){
            alert("The request is empty!");
        }
        setFilter(value);
    }

    const onGalleryClickHandle = ({src, alt}) => {
        
        setImage({ src, alt });
        setIsModalOpen(true);
    }

    const toggleModal = () => {
        setIsModalOpen( !isModalOpen );
    }

    return  <>
                <SearchBar onSubmit={onSubmitHandle} />
                <ImageGallery filter={filter.trim().toLowerCase()} onGalleryClick={onGalleryClickHandle}/>
                {isModalOpen && <Modal onClose={toggleModal} image={image}/>}
            </>
}

App.propTypes = {
    filter : PropTypes.string,
    isModalOpen: PropTypes.bool,
    image: PropTypes.object
}
