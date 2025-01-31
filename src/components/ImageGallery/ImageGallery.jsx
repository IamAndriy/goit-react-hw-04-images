import { useState, useEffect } from "react";
import { fetchImagesFromAPI } from "Api/api";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { nanoid } from "nanoid";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({filter, onGalleryClick}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isButtonShown, setIsButtonShown] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [page, setPage] = useState(1);
    const [per_page, setPerPage] = useState(12);
    const [error, setError] = useState(null);

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

        console.log("filter=",filter);
        getGallery(filter);

        return ()=>{  abortCtrl.abort() }        

    }, [filter, page, per_page]);
    

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

                { isLoading && <Loader /> }

                { error && <p>Error! "{error}"</p>}

                { isButtonShown && <Button title="Load more" onClick={onLoadMoreClick}/>}

            </main>
            
}

