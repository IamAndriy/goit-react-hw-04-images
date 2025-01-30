import { Component } from "react";
import css from "./Modal.module.css"

export class Modal extends Component{    
 
    componentDidMount = () => {
        window.addEventListener('keydown', this.onEscapeKeyDown);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.onEscapeKeyDown);
    }

    onOverlayClick = ({target, currentTarget}) => {

        if (target === currentTarget) {
            this.props.onClose();
        }
    }

    onEscapeKeyDown = ({code}) => {
        if (code === 'Escape') {
            this.props.onClose();
        }
    }

    render(){
        
        const {src, alt} = this.props.image;

        return  <div className={css.overlay} onClick={this.onOverlayClick}>
                    <div className={css.modal}>
                        <img className={css.image} src={src} alt={alt} />
                    </div>
                </div>
    }
}