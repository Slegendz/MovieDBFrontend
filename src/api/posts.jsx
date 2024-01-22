import axios from 'axios'

export default axios.create({
    // Url which is connected to DB
    baseURL: 'https://moviedb-kozq.onrender.com/reviews'
});