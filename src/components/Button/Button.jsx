import css from './Button.module.css';

export const Button = ({title, onClick}) => {

    return  <button className={css.Button} onClick={onClick}>
                {title}
            </button>
}
