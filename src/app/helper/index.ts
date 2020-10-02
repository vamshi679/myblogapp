import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from "../helper/token-interceptor.service";

// creating a constant of type array and importing appropriate modules. 
// it is helpful if we create multiple httpInterceptor classes
export const httpInterceptProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    }
]
