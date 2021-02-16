import { CanActivate, Injectable, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { UserService } from '../../user/service/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { hasRoles } from '../decorator/role.decorator';
import { map } from 'rxjs/operators';
import * as request from 'supertest';


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        @Inject(forwardRef(() => UserService))
        private _userService: UserService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        //const user: User = request.user;
          const user: User = request.user.user;
        
        return this._userService.findOne(user.id).pipe(
            map((user: User) => {
                const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission: boolean = false;
                if(hasRoles()){
                    hasPermission = true;
                }
                return user && hasPermission
            })
        );
        // return matchRoles(roles, user.roles);
    }
    
}