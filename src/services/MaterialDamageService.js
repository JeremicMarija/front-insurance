import axios from 'axios';

export class MaterialDamageService{
 static serverURL = `http://localhost:8080`;

 static getAllMaterialDamages(){
  let dataURL = `${this.serverURL}/materialDamages`;
  return axios.get(dataURL);
 }
 static getMaterialDamage(materialDamageId){
  let dataURL = `${this.serverURL}/materialDamages/${materialDamageId}`;
  return axios.get(dataURL);
 }

}