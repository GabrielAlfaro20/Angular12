import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  title = 'Data Print';
  public Sidenav: boolean = false;
  isExpanded = true;
  isShowing = false;
  confiUsuario:boolean=false
  constructor() { }

  ngOnInit(): void {
  }

  getSidenav(): boolean {
    return this.Sidenav;
  }
  setSidenav(value: boolean) {
    this.Sidenav = value;
  }
}
