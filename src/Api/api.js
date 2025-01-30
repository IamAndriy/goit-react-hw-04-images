import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params={
    key: '35820860-09ae26b0f261a8f2213be3901',
    image_type : 'photo',
    orientation : 'horizontal',
}

export async function fetchImagesFromAPI (q, page, per_page, abortCtrl) {
    
    const response = await axios.get(`?q=${q}&page=${page}&per_page=${per_page}`, {signal: abortCtrl.signal,});

    return response.data;
};
