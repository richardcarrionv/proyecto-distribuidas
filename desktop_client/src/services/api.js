import axios from "axios"; 
export default axios.create({ 
  baseURL: "https://onealarm.herokuapp.com/api"
});
