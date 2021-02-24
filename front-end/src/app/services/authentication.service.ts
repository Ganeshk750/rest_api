import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginForm } from '../models/login-form';
import { User } from '../models/user-form';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient) { }

  login(loginForm: LoginForm): Observable<any> {
    return this._http.post<any>('/api/users/login', { email: loginForm.email, password: loginForm.password }).pipe(
      map((token) => {
        console.log('token');
        localStorage.setItem('blog-token', token.access_token);
        return token;
      })
    );
  }


  register(user: User): Observable<any>{
    return this._http.post<any>('/api/users/', user).pipe(
      map(user => user)
    )
  }
}
