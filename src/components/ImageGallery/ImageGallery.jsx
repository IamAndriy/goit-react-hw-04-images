import { Component } from "react";
import { fetchImagesFromAPI } from "Api/api";
import {ImageGalleryItem} from "../ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { nanoid } from "nanoid";
import css from "./ImageGallery.module.css";

const initialState = {
    isLoading: false,
    isEmpty: false,
    isButtonShown: false,
    gallery : [],
    page: 1,
    per_page: 12,
    error: null,
}

export class ImageGallery extends Component{

    abortCtrl;

    state = {
        ...initialState
    }

    onGalleryClick = ({target}) => {
        const {gallery} = this.state;
        const {largeImageURL:src, tags:alt} = gallery.find(({id}) => id.toString() === target.id);
        this.props.onGalleryClick({ src, alt }); 
    }

    onLoadMoreClick = () => {
        this.setState(prevState => ({page: prevState.page + 1}));
    }

    getGallery = async (query, page, per_page) => {

        if (this.abortCtrl) {
            this.abortCtrl.abort();
        }        

        try {
            this.setState({isLoading : true});

            this.abortCtrl = new AbortController();
            const {hits, totalHits} = await fetchImagesFromAPI(query, page, per_page, this.abortCtrl);

            if (!hits.length){
                return this.setState({isEmpty : true});
            }

            this.setState((prevState) => ({gallery : [...prevState.gallery, ...hits]}));
            this.setState({isButtonShown: page < Math.ceil(totalHits / per_page)});

        } catch (error) {
            this.setState({error : error});
        }finally{
            this.setState({isLoading : false});
        }
        
    }

    componentDidUpdate = (prevProps, prevState) => {

        const {page, per_page} = this.state;
        const {filter} = this.props;

        if (filter !== prevProps.filter){

            this.setState({...initialState});
            this.getGallery(filter, page, per_page);

        }else if (page !== prevState.page){

            this.getGallery(filter, page, per_page);
        }
    }

    render(){

        const {isLoading, isEmpty, isButtonShown, gallery, error} = this.state;
        const {onGalleryClick, onLoadMoreClick} = this;

        return  <main className={css.main}>

                    { isEmpty
                        ?   <p className={css.massage}>Sorry, there are no images for filter</p>
                        :   <ul className={css.gallery}>
                                {gallery.map((item) => { 
                                                return <ImageGalleryItem key={nanoid()}
                                                                         id={item.id} 
                                                                         src={item.webformatURL} 
                                                                         alt={item.tags} 
                                                                         onGalleryItemClick={onGalleryClick}
                                                      />})}
                            </ul>
                    }

                    { isLoading && <Loader /> }

                    { error && <p>Error! {error}</p>}

                    { isButtonShown && <Button title="Load more" onClick={onLoadMoreClick}/>}

                </main>
    }
}

