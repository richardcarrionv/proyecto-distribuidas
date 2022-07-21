import axios from "axios"; 
const heroku = "https://onealarm.herokuapp.com/api";
const local = "http://192.168.100.162:8080/api";
export default axios.create({ 
  baseURL: heroku
});
