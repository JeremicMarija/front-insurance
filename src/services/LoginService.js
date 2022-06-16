import axios from "axios";

export class LoginService{
 static serverURL = `http://localhost:8080`;

 static login(user){
  let dataURL = `${this.serverURL}/authenticate`;
  return axios.post(dataURL, user);
 }
}