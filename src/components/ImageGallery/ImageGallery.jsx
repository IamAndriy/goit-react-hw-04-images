import { useState, useEffect, useRef } from "react";
import { fetchImagesFromAPI } from "Api/api";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { nanoid } from "nanoid";
import css from "./ImageGallery.module.css";
import PropTypes, { object } from "prop-types";

export const ImageGallery = ({filter, onGalleryClick}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isButtonShown, setIsButtonShown] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [page, setPage] = useState(1);
    const [per_page, setPerPage] = useState(12);
    const [error, setError] = useState(null);

    const endOfGellaryRef = useRef();

    useEffect(()=>{

        const resetState = ()=>{
            setIsLoading(false);
            setIsEmpty(false);
            setIsButtonShown(false);
            setGallery([]);
            setPage(1);
            setPerPage(12);
            setError(null);
        }

        resetState();
    
    }, [filter]);

    useEffect( ()=>{

        const abortCtrl = new AbortController();
        
        if (!filter) return;

        const getGallery = async (query) => {

            try {
                setIsLoading(true);   
                
                const {hits, totalHits} = await fetchImagesFromAPI(query, page, per_page, abortCtrl);
    
                if (!hits.length){
                    return setIsEmpty(true);
                }
    
                setGallery(gallery=>[...gallery, ...hits]);            
                setIsButtonShown( (page < Math.ceil(totalHits / per_page)));
    
            } catch (error) {
                setError(error);
            } finally{
                setIsLoading(false);
            }
            
        }

        getGallery(filter);

        return ()=>{  abortCtrl.abort() }        

    }, [filter, page, per_page]);
    
    useEffect(()=>{
        const count = gallery.length;
        const top = endOfGellaryRef.current.offsetTop;
        window.scrollTo({top: ((top/count)*(count-12)-200),  behavior: "smooth",});
    },[gallery.length]);

    const onGalleryClickHandle = ({target}) => {

        const {largeImageURL:src, tags:alt} = gallery.find(({id}) => id.toString() === target.id);
        onGalleryClick({ src, alt }); 
    }

    const onLoadMoreClick = () => {
        setPage(page + 1);
    }

    return  <main className={css.main}>

                { isEmpty
                    ?   <p className={css.massage}>Sorry, there are no images for filter</p>
                    :   <ul className={css.gallery}>
                            {gallery.map((item) => { 
                                            return <ImageGalleryItem key={nanoid()}
                                                                        id={item.id} 
                                                                        src={item.webformatURL} 
                                                                        alt={item.tags} 
                                                                        onGalleryItemClick={onGalleryClickHandle}
                                                    />})}
                        </ul>
      
                }

                  <p ref={endOfGellaryRef}></p>
                    
                { isLoading && <Loader /> }

                { error && <p>Error! "{error}"</p>}

                { isButtonShown && <Button title="Load more" onClick={onLoadMoreClick}/>}

            </main>
            
}

ImageGallery.propTypes = {
    isLoading : PropTypes.bool,
    isEmpty : PropTypes.bool,
    isButtonShown: PropTypes.bool,
    gallery: PropTypes.arrayOf(object),
    page: PropTypes.number,
    per_page: PropTypes.number,
    error: PropTypes.string,
    filter: PropTypes.string,
    onGalleryClick: PropTypes.func,
}