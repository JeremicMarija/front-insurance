import axios from 'axios';

export class VehicleService{
 static serverURL = `http://localhost:8080`;

 static getAllVehicles(){
  let dataURL = `${this.serverURL}/vehicles`;
  return axios.get(dataURL);
 }


}