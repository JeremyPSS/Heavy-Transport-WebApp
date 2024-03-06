import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
    }
  }
  isLoggedIn(){
    return localStorage.getItem('isLoggedIn');
  }


}
