import { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export const Modal = ({image, onClose}) => {    
 
    useEffect(()=>{
        
        const onEscapeKeyDown = ({code}) => {
            if (code === 'Escape') {
                onClose();
            }
        }
        
        window.addEventListener('keydown', onEscapeKeyDown);

        return ()=>{window.removeEventListener('keydown', onEscapeKeyDown)}

    }, [onClose]);

    const onOverlayClick = ({target, currentTarget}) => {

        if (target === currentTarget) {
            onClose();
        }
    }

    return  <div className={css.overlay} onClick={onOverlayClick}>
                <div className={css.modal}>
                    <img className={css.image} src={image.src} alt={image.alt} />
                </div>
            </div>

} 

Modal.propTypes = {
    image: PropTypes.object,
    onClose: PropTypes.func,
}