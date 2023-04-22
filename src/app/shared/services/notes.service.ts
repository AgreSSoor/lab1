import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/app/environments/environments";
import { Note } from '../models/notes/note';
import { EditNote } from '../models/notes/edit-note';

@Injectable({
  providedIn: 'root'
})

export class NotesService {
  constructor(private http: HttpClient) {}

  readonly baseUrl = environment.baseUrl + 'note'

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/list`)
  }

  createNote(note: EditNote): Observable<EditNote> {
    return this.http.post<Note>(`${this.baseUrl}/create`, note);
  }

  get(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/getById?noteId=${id}`);
  }
  updateNote(note: EditNote): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/edit`, note);
  }

  searchByText(text: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/search?text=${text}`)
  }

  searchByUserId(userId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/getByUserId?userId=${userId}`)
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete?id=${id}`);
  }
}
