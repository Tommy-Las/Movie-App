import axios from 'axios'

function createUserWatchlist (user_id) {
    let obj = {uid: user_id}
    axios.post('http://localhost:5888/watchlist/' + user_id).then((res) => {
        console.log(res)
    }).catch((err)=>{console.log(err)})
}

export default createUserWatchlist;