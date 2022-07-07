import axios from "axios"; 
const heroku = "https://onealarm.herokuapp.com/api";
const local = "http://localhost:8081/api";
export default axios.create({ 
  baseURL: local
});
