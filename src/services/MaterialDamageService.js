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
 

}