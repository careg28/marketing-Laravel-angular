import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from "../logout/logout.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,

    LogoutComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  isDesktop = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
  setTimeout(() => {
    this.breakpointObserver.observe(['(min-width: 900px)']).subscribe(result => {
      this.isDesktop = result.matches;
      if (this.drawer) {
        if (this.isDesktop) {
          this.drawer.mode = 'side';
          this.drawer.open();
        } else {
          this.drawer.mode = 'over';
          this.drawer.close();
        }
        this.cdRef.detectChanges();
      }
    });
  });
}

  toggleMenu() {
    this.drawer.toggle();
  }
  

 closeMenuOnMobile() {
  if (this.drawer && !this.isDesktop) {
    this.drawer.close();
  }
}
}
