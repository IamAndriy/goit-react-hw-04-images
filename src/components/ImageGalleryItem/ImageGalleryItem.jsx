import { Component } from "react";
import css from "./ImageGalleryItem.module.css";



export class ImageGalleryItem extends Component{

    render(){
        
        const {id, src, alt, onGalleryItemClick} = this.props;

        return  <li className={css["ImageGalleryItem"]} onClick={onGalleryItemClick}>
                    <img className={css["ImageGalleryItem-image"]} 
                         id={id} 
                         src={src} 
                         alt={alt}
                    />
                </li>
    }
}
