import { EditNote } from './../shared/models/notes/edit-note';
import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/models/notes/note';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../shared/services/notes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css'],
})
export class NoteEditComponent implements OnInit {
  id: string;
  note: Note;
  form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    text: new FormControl(null, [Validators.required])
  });

  constructor(
    private noteService: NotesService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute
    .queryParams
    .subscribe(params =>
      this.id = params['id']);

    this.noteService.get(this.id).subscribe(data => {
      this.note = data;
    })
  }

  edit() {
    console.log(this.form);

    if(this.form.valid){
      let note: EditNote = <EditNote> {
        id: this.id,
        text: this.text.value,
        title: this.title.value
      }

      this.noteService.updateNote(note).subscribe(data => {});
    }
  }

  getTitleErrorMsg(){
    if (this.title.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getTextErrorMsg(){
    if (this.text.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  get title():FormControl {
    return this.form.get('title') as FormControl;
  }

  get text():FormControl {
    return this.form.get('text') as FormControl;
  }
}
