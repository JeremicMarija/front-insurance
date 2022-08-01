import axios from 'axios';

export class MaterialDamageService{
 static serverURL = `http://localhost:8080`;

 static getAllMaterialDamages(){
  let dataURL = `${this.serverURL}/materialdamages`;
  return axios.get(dataURL);
 }
 static getMaterialDamage(materialDamageId){
  let dataURL = `${this.serverURL}/materialdamages/${materialDamageId}`;
  return axios.get(dataURL);
 }
 static getReportOfMaterialDamages(){
  let dataURL = `${this.serverURL}/materialdamages/report/pdf`;
  return axios.get(dataURL);
 }

 static getMaterialDamagesByVehicle(vehicleId){
  let dataURL = `${this.serverURL}/materialdamages/vehicle/${vehicleId}`;
  return axios.get(dataURL)
 }
 
 static getReportMaterialDamgesOfVehicle(vehicleId){
  let dataURL = `${this.serverURL}/materialdamages/vehicle/${vehicleId}/report`;
  return axios.get(dataURL);
 }

 static search(vehicleRegNum){
  let dataURL = `${this.serverURL}/materialdamages/search?vehicleRegNum=${vehicleRegNum}`;
  return axios.get(dataURL);
 }

 static createMaterialDamage(materialDamage){
  let dataURL = `${this.serverURL}/materialdamages`;
  return axios.post(dataURL,materialDamage);
 }

 static updateMaterialDamage(materialDamage){
  let dataURL = `${this.serverURL}/materialdamages`;
  return axios.put(dataURL, materialDamage);
 }

}