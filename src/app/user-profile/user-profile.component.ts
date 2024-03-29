import { Component, OnInit } from '@angular/core';
//API
import { FetchApiDataService } from '../fetch-api-data.service';
//Component
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
//Material design
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];
/**
 * @param fetchApiData 
 * @param dialog 
 * @param router 
 * @param snackBar 
 */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }
  
  /**
   * Initialize the component loading the data
   * @function ngOnInit
   */

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }
/**
 * Opens edit profile dialog.User now can edit his profile 
 */
  openEditProfileDialog(): void {
    this.dialog.open(UserProfileEditComponent, {
      width: '300px'
    })
  }
/**
 *  user can delete his profile
 */
  deleteProfile(): void {
    if (confirm('Do you really want to delete this account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
