import axios from 'axios';

export class DamageTypeService{
 static serverURL = `http://localhost:8080`;

 static getAllDamageTypes(){
  let dataURL = `${this.serverURL}/damagetypes`;
  return axios.get(dataURL);
 }
}