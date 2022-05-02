import axios from 'axios'

async function movieInWatchlist (user_id, movie_id) {
    let myPromise = new Promise((resolve, reject) => {
        console.log('in check movie function. the movie id is: ' + movie_id)
        let obj = {
            uid: user_id,
            movie_id : movie_id,
        }
        axios.get('http://localhost:5888/watchlist', {params: obj}).then((res)=>{
            resolve(res.data);
            }).catch((err)=>{
                console.log(err)
            })
    })
    let value = await myPromise;
    return value
}

export default movieInWatchlist;