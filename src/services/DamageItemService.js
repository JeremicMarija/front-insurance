import axios from 'axios';

export class DamageItemService{
 static serverURL = `http://localhost:8080`;

 static getAllDamageItem(){
  let dataURL = `${this.serverURL}/materialdamageitems`;
  return axios.get(dataURL);
 }
 static getDamageItem(damageItemId){
  let dataURL = `${this.serverURL}/materialdamageitems/${damageItemId}`;
  return axios.get(dataURL);
 }
 static getDamageItemByMaterialDamage(materialDamageId){
  let dataURL = `${this.serverURL}/materialdamageitems/materialdamage/${materialDamageId}`;
  return axios.get(dataURL);
 }

 static getReportDamageItemsOfMaterialDamage(materialDamageId){
  let dataURL = `${this.serverURL}/materialdamageitems/materialdamage/${materialDamageId}/report`;
  return axios.get(dataURL);
 }
 
 static createDamageItem(damageItem){
  let dataURL = `${this.serverURL}/materialdamageitems`;
  return axios.post(dataURL, damageItem);
 }
}