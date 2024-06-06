import axios from "axios";
 
const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3/",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWQ5NTZhOWRmOGE0OWViYjUwYTE2MzA5ZjQxNmMyYSIsInN1YiI6IjY2NTIwYjRiN2ZmODgwZThmZDU1YTcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RZR0lx_t9dDxauw9YajRZgubg2iTZP8Ttf94n4NBN1U'
    }
})

export default instance;

