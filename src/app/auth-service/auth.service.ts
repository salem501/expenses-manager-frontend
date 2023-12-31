import {Injectable} from '@angular/core';
import * as http from "http";
import {HttpClient} from "@angular/common/http";
import {AuthenticationRequest, AuthenticationResponse, RegisterRequest, User} from "../model";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = '/localhost:8080';

  private httpClient;

  private token: string | undefined;

  public loggedUser: string | undefined;

  private jwtHelperService;

  constructor(httpClient: HttpClient, jwtHelperService: JwtHelperService) {
    this.httpClient = httpClient;
    this.jwtHelperService = jwtHelperService;
  }

  private decodeJwt() {
    if (!this.token) return;
    let decodedToken = this.jwtHelperService.decodeToken(this.token!);
    this.loggedUser = decodedToken.sub;
  }

  private saveToken() {
    if (!this.token) return;
    localStorage.setItem("jwt-token", this.token);
  }

  loadToken() {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      this.token = token;
    }else {
      //Todo: handle token not found in Cache
    }
  }

  login(loginRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    const url = `${this.baseUrl}/authenticate`
    return this.httpClient.post<AuthenticationResponse>(url, loginRequest);
  }

  signup(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    const url = `${this.baseUrl}/register`
    return this.httpClient.post<AuthenticationResponse>(url, registerRequest);
  }
}
