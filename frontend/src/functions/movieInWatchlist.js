import axios from 'axios'

/**
 * function that will send a get request to /watchlist with the user_id and movie_id as parameters
 * will check if the user of given user_id contains the movie_id in the watchlist
 * 
 * @param {string} user_id 
 * @param {string} movie_id 
 * @returns true if the movies is in the watchlist, false if the movie is not
 */
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