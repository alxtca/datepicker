import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {MatDrawer} from "@angular/material/sidenav";

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public isScreenSmall!: boolean;
  users!: Observable<User[]>

  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(private breakpointObserver: BreakpointObserver,
              private userService: UserService,
              private router: Router
  ) { }

  ngOnInit(): void {

    //watch breakpoint, and update isScreenSmall
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state:BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.users = this.userService.users;
    this.userService.loadAll()

    //automatically show first user as selected
    this.users.subscribe(data => {
      if (data.length > 0) this.router.navigate(['/contactmanager', data[0].id])
    })

    //router exposes events as an observable. (when route changes, close sidenav on small screen)
    this.router.events.subscribe(()=> {
      if (this.isScreenSmall) {
        console.log("This is small screen")
        //this.drawer.toggle()
        this.drawer.close()
      }
    })
  }
}
