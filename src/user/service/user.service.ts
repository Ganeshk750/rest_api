import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { AuthService } from '../../auth/service/auth.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>,
        private _authService: AuthService
    ) { }

    create(user: User): Observable<User> {
        // return from(this._userRepository.save(user));
        return this._authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;
                /* Adding Roles */
                newUser.role = user.role;
                return from(this._userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const { password, ...result } = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }

    findOne(id: number): Observable<User> {
        // return from(this._userRepository.findOne({ id }));
        return from(this._userRepository.findOne({ id })).pipe(
            map((user: User) => {
                const { password, ...result } = user;
                return result;
            })
        )
    }

    findAll(): Observable<User[]> {
        //return from(this._userRepository.find());
        return from(this._userRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(function (v) { delete v.password });
                return users;
            })
        )

    }

    deleteOne(id: number): Observable<any> {
        // return from(this._userRepository.delete(id));
        return from(this._userRepository.delete(id));
    }

    updateOne(id: number, user: User): Observable<any> {
        //return from(this._userRepository.update(id, user));
        delete user.email;
        delete user.password;
        return from(this._userRepository.update(id, user));
    }


    updateRoleOfUser(id: number, user: User): Observable<any> {
       return from(this._userRepository.update(id, user));
    }



    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if (user) {
                    return this._authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<User> {
        return this.findByMail(email).pipe(
            switchMap((user: User) => this._authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if (match) {
                        const { password, ...result } = user;
                        return result;
                    } else {
                        throw Error;
                    }
                })
            ))
        )
    }

    findByMail(email: string): Observable<User> {
        return from(this._userRepository.findOne({ email }));
    }








}
