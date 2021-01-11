import axios from 'axios';


export default axios.create({
    baseURL: 'https://api.nasa.gov/neo/rest/v1/neo/',

});