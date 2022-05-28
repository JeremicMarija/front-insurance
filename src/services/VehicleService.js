import axios from 'axios';

export class VehicleService{
 static serverURL = `http://localhost:8080`;

 static getAllVehicles(){
  let dataURL = `${this.serverURL}/vehicles`;
  return axios.get(dataURL);
 }
 
 static getVehicle(vehicleId){
  let dataURL = `${this.serverURL}/vehicles/${vehicleId}`;
  return axios.get(dataURL);
 }
 static getVehiclesByInsured(insuredId){
  let dataURL = `${this.serverURL}/vehicles/insured/${insuredId}`;
  return axios.get(dataURL)
 }

 static createVehicle(vehicle){
  let dataURL = `${this.serverURL}/vehicles`;
  return axios.post(dataURL, vehicle);
 }

 // static updateVehicle(vehicle, vehicleId){
 //  let dataURL = `${this.serverURL}/vehicles/${vehicleId}`;
 //  return axios.put(dataURL, vehicle);
 // }
 static updateVehicle(vehicle){
   let dataURL = `${this.serverURL}/vehicles`;
   return axios.put(dataURL, vehicle);
  }


}