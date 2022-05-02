import axios from 'axios'

function removeMovieWatchlist (user_id, movie_id) {
    console.log('in remove movie function. the movie id is: ' + user_id)
    
    let obj = {
        uid: user_id,
        movie_id : movie_id,
    }
    axios.delete('http://localhost:5888/watchlist', {params: obj}).then((res)=>{
        console.log(res)}).catch((err)=>{
            console.log(err)
        })
}

export default removeMovieWatchlist;