import { Component } from '@angular/core';
import { NotesService } from '../shared/services/notes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditNote } from '../shared/models/notes/edit-note';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    text: new FormControl(null, [Validators.required])
  });

  create() {
    console.log(this.form);

    if(this.form.valid){
      let note: EditNote = <EditNote> {
        text: this.text.value,
        title: this.title.value
      }

      this.noteService.createNote(note).subscribe(data => {});
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

  constructor(
    private noteService: NotesService) {}
}
