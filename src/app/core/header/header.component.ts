import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dropStatus = false;
  expandStatus = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onDropdown() {
   this.dropStatus = !this.dropStatus;
  }

  onExpand() {
    this.expandStatus = !this.expandStatus;
  }

  userAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }
}
