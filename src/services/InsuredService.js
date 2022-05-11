import axios from 'axios';

export class InsuredService{
 static serverURL = `http://localhost:8080`;

 static getAllInsureds(){
  let dataURL = `${this.serverURL}/insureds`;
  return axios.get(dataURL);
 }
 static getInsured(insuredId){
  let dataURL = `${this.serverURL}/insureds/${insuredId}`;
  return axios.get(dataURL);
 }

 static createInsured(insured){
  let dataURL = `${this.serverURL}/insureds`;
  return axios.post(dataURL, insured)
 }

 static updateInsured(insured, insuredId){
  let dataURL = `${this.serverURL}/insureds/${insuredId}`;
  return axios.put(dataURL, insured)
 }
 static deleteInsured(insuredId){
  let dataURL = `${this.serverURL}/insureds/${insuredId}`;
  return axios.delete(dataURL)
 }

 static getAllGroups(){
  let dataURL = `${this.serverURL}/groups`;
  return axios.get(dataURL)
 }

 static getGroup(insured){
  let groupId = insured.groupId;
  let dataURL = `${this.serverURL}/groups/${groupId}`;
  return axios.get(dataURL)
 }

}