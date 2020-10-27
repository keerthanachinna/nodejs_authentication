import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserpayload() {
    let token = localStorage.getItem('token');
    if(token){
      let Userpayload=atob(token.split('.')[1]);
      return JSON.parse(Userpayload);
    }else
    return null
  }
  isLoggedIn(){
  let Userpayload=this.getUserpayload();
  if(Userpayload)
  return Userpayload.exp >Date.now()/1000;
  }

}
