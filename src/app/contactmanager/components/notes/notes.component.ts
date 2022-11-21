import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Note} from "../../models/note";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource!: MatTableDataSource<Note>;

  @Input() notes: Note[] = []

  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

  //these for paginator to work:
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
