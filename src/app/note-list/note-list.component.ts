import { Component, OnInit } from '@angular/core';
import { NotesService } from '../shared/services/notes.service';
import { Note } from '../shared/models/notes/note';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notes: Note[];
  id: string | undefined;
  displayedColumns: string[] = [ "title", "text", "userId", "lastUpdate", "interaction" ];

  constructor(private noteService: NotesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute
    .queryParams
    .subscribe(params =>
      this.id = params['id']);

    if(this.id !== undefined){
      this.noteService.searchByUserId(this.id).subscribe(data => {
        this.notes = data;
      })
    }
    else {
      this.getAll();
    }

  }

  getAll = () => {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
    })
  }

  delete = (id: string) => {
    this.noteService.deleteNote(id).subscribe(() => {
      window.location.reload();
    });
  }

  filter(form:NgForm){
    this.noteService.searchByText(form.value.searchParameter).subscribe((data) => {
      this.notes = data;
    });
  }
}
