import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
//import { bcrypt } from 'bcrypt';
const bcrypt = require('bcrypt');
import { of } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private readonly _jwtService: JwtService) { }

  generateJwt(user: User): Observable<string> {
    return from(this._jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePasswords(newPassword: string, passwordHash: string): Observable<any | boolean> {
    return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
  }
}
