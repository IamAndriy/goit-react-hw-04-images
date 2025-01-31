import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({id, src, alt, onGalleryItemClick}) => {

    return  <li className={css["ImageGalleryItem"]} onClick={onGalleryItemClick}>
                <img className={css["ImageGalleryItem-image"]} 
                        id={id} 
                        src={src} 
                        alt={alt}
                />
            </li>
}

ImageGalleryItem.propTypes = {
    id : PropTypes.number,
    src : PropTypes.string,
    alt : PropTypes.string,
    onGalleryItemClick: PropTypes.func,
}