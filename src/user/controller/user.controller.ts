import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';

@Controller('users')
export class UserController {

    constructor(private _userService: UserService) { }

    @Post()
    create(@Body() user: User): Observable<User> {
        return this._userService.create(user);
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
