import { Component, Injectable, OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
