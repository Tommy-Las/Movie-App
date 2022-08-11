import axios from 'axios'

/**
 * 
 * using axios, sends a POST request to /watchlist/add to add a movie to the watchlist of the user_id given
 * the movie image and the movie id will be added to the watchlist
 * it will display to console a success or error message
 * @param {string} user_id 
 * @param {string} movie_id 
 * @param {string} image 
 */
function addMovieWatchlist (user_id, movie_id, image) {    
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