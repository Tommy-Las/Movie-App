import axios from 'axios'

function movieInWatchlist (user_id, movie_id) {
    console.log('in remove movie function. the movie id is: ' + user_id)
    
    let obj = {
        _id: user_id,
        movie_id : movie_id,
    }
    axios.get('http://localhost:5888/watchlist/check', null, {params: obj}).then((res)=>{
        console.log(res)}).catch((err)=>{
            console.log(err)
        })
}

export default movieInWatchlist;