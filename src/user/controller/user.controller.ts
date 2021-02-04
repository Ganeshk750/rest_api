import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Controller('users')
export class UserController {

    constructor(private _userService: UserService) { }

    @Post()
    create(@Body() user: User): Observable<User | Object> {
        //return this._userService.create(user);
        return this._userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        )
    }


    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this._userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }


    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this._userService.findOne(params.id);
    }

    @Get()
    findAll(): Observable<User[]> {
        return this._userService.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
        return this._userService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this._userService.updateOne(Number(id), user);

    }
}
