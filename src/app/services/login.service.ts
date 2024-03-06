import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../Models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login } from '../Models/Login';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> =new BehaviorSubject<User>({id:0, email:''});


  login(credentials:Login):Observable<User>{
    return this.http.get<User>('././assets/data.json').pipe(
      tap( (userData: User) => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

//------------------------------------------------------------------------------------------------------------------------------


invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router:Router) { }
  userSignUp(user:User){
   this.http.post('http://localhost:4000/cliente',user,{observe:'response'})
   .subscribe((result)=>{
    if(result){
      localStorage.setItem('cliente',JSON.stringify(result.body));
      this.router.navigate(['/admin']);
    }
    
   })
    
  }
  userLogin(data:Login){
    this.http.get<User[]>(`http://localhost:4000/cliente?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('cliente',JSON.stringify(result.body[0]));
        this.router.navigate(['/admin']);
        this.invalidUserAuth.emit(false)
      }else{
        this.invalidUserAuth.emit(true)
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('cliente')){
      this.router.navigate(['/admin']);
    }
  }



  //------------------------------------------------------------------------------------------------------------------------------

  private baseUrl = 'http://localhost:4000/cliente';
  list:  any=[];
  islogin = false;
  admin = false;
  suser = false;
  client = false;
  four = false;
  // host :string = 'http://localhost:8080';
  choixmenu : string  = 'A';
  name : string = "Foulen";
  public formData!:  FormGroup; 

  login2(username :string, pwd : string ) {
    return this.http.get(`${this.baseUrl}/${username}`);
   
  } 
   
  verifEmail(email :string) {
    return this.http.get(`${this.baseUrl}/${email}`); 
  }  
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  
}


