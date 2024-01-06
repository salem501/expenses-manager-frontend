import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationRequest, AuthenticationResponse, RegisterRequest} from "../model";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/auth';

  private httpClient;

  private token: string | undefined;

  public loggedUser: string | undefined;

  public userId: string |  undefined;

  private jwtHelperService;

  constructor(httpClient: HttpClient,
              jwtHelperService: JwtHelperService,
              private router: Router
          ) {
    this.httpClient = httpClient;
    this.jwtHelperService = jwtHelperService;
  }

  private decodeJwt() {
    if (!this.token) return;
    let decodedToken = this.jwtHelperService.decodeToken(this.token!);
    this.loggedUser = decodedToken.sub;
    this.userId = decodedToken['userId'];
  }

  saveToken(jwt:string) {
    localStorage.setItem('jwt-token',jwt);
    this.token = jwt;
    this.decodeJwt();
  }

  loadToken() {
    const token = localStorage.getItem("jwt-token");
    this.token = token!;
    this.decodeJwt();
  }

  login(loginRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    const url = `${this.baseUrl}/authenticate`
    return this.httpClient.post<AuthenticationResponse>(url, loginRequest);
  }

  logout(){
    localStorage.removeItem("jwt-token");
    this.userId = undefined;
    this.loggedUser = undefined;
    this.router.navigate(['/login']);
  }

  signup(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    const url = `${this.baseUrl}/register`
    return this.httpClient.post<AuthenticationResponse>(url, registerRequest);
  }
}
