import axios from 'axios'

function removeMovieWatchlist (user_id, movie_id) {
    console.log('in remove movie function. the movie id is: ' + user_id)
    
    let obj = {
        _id: user_id,
        movie_id : movie_id,
    }
    axios.delete('http://localhost:5888/watchlist/remove', null, {params: obj}).then((res)=>{
        console.log(res)}).catch((err)=>{
            console.log(err)
        })
}

export default removeMovieWatchlist;