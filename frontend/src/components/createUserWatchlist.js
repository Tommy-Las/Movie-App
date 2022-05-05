import axios from 'axios'

/**
 * 
 * using axios, sends a POST request to /watchlist/:user_id to create a watchlist to the user_id given
 * it will display to console a success or error message
 * @param {string} user_id 
 * @param {string} movie_id 
 * @param {string} image 
 */
function createUserWatchlist (user_id) {
    let obj = {uid: user_id}
    axios.post('http://localhost:5888/watchlist/' + user_id).then((res) => {
        console.log(res)
    }).catch((err)=>{console.log(err)})
}

export default createUserWatchlist;