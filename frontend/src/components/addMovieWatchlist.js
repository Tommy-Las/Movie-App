import axios from 'axios'

function addMovieWatchlist (user_id, movie_id, image) {
    console.log('in add movie function. the movie id is: ' + movie_id + "poster is " + image)
    
    let obj = {
        _id: user_id,
        movie_id : movie_id,
        image: image
    }

    axios.post('http://localhost:5888/watchlist/add', null, {params: obj}).then((res) => {
        console.log(res)
    }).catch((err)=>{console.log(err)})
}

export default addMovieWatchlist;