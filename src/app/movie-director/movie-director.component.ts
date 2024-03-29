import { Component, OnInit, Inject } from '@angular/core';

// Angular Material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {
/**
 * @param data 
 */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
    }
  ) { }

  ngOnInit(): void {
  }

}