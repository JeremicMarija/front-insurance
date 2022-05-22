import axios from 'axios';

export class CityService{
 static serverURL = `http://localhost:8080`;

 static getAllCities(){
  let dataURL = `${this.serverURL}/cities`;
  return axios.get(dataURL)
 }
 static getCity(cityId){
  let dataURL = `${this.serverURL}/cities/${cityId}`;
  return axios.get(dataURL);
 }


}