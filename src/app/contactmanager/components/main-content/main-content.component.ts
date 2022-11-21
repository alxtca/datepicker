import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormControl, Validators} from "@angular/forms";
import {DateFormatOutputFNS, DateFormatOutputMoment} from "../../models/date-formats";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  config1_fns:DateFormatOutputFNS = DateFormatOutputFNS["yyyy-mm-ddT00:00:00Z"]
  config2_fns:DateFormatOutputFNS = DateFormatOutputFNS["yyyy-mm-dd"]
  config1_moment:DateFormatOutputMoment = DateFormatOutputMoment["yyyy-mm-ddT00:00:00Z"]


  date0!: FormControl;
  dt: string = "2001-12-30"
  date1!: FormControl;
  date2!: FormControl<string | null>;
  date3!: FormControl;
  date4!: FormControl;

  user!: User;
  constructor(private route: ActivatedRoute,
              private service: UserService) { }

  ngOnInit(): void {

    //any format send to datepicker, will be parsed into object
    this.date0 = new FormControl( "1999-01-30T01:01:01Z")
    this.date1 = new FormControl( "1999-01-30T01:01:01Z")
    this.date2 = new FormControl()
    this.date3 = new FormControl("1998-10-10")
    this.date4 = new FormControl(new Date())

    this.date0.valueChanges.subscribe(v => {
      console.log("valueChanges to date0: \n", v , "\n", typeof v)
    })
    this.date1.valueChanges.subscribe(v => {
      console.log("valueChanges to date1: \n", v , "\n", typeof v)
    })

    this.date2.valueChanges.subscribe(v => {
      console.log("valueChanges to date2: \n", v, "\n", typeof v)
    })
    this.date3.valueChanges.subscribe(v => {
      console.log("valueChanges to date3: \n", v, "\n", typeof v)
    })
    this.date4.valueChanges.subscribe(v => {
      console.log("valueChanges to date4: \n", v, "\n", typeof v)
    })


    this.route.params.subscribe(params => {
      const id = params['id'];

      this.service.users.subscribe( users => {
        if (users.length == 0) return
        this.user = this.service.userById(id)
      })
    })
  }

  logChange() {
    console.log(this.dt)
  }

  updateDt() {
    this.dt = "2222-11-25"
  }
}
