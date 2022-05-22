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
 static createMaterialDamage(materialDamage){
  let dataURL = `${this.serverURL}/materialdamages`;
  return axios.post(dataURL,materialDamage);
 }

 static updateMaterialDamage(materialDamage){
  let dataURL = `${this.serverURL}/materialdamages`;
  return axios.put(dataURL, materialDamage);
 }

}