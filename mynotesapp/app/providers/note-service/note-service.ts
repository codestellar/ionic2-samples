import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Note } from '../../models/note';
import { Storage, SqlStorage } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the NoteService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NoteService {

storage: Storage = null;

  constructor(private http: Http) {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, text TEXT)');
  }

// Get all notes of our DB
  public getNotes() {
    return this.storage.query('SELECT * FROM notes');
  }
 
  // Save a new note to the DB
  public saveNote(note: Note) {
    let sql = 'INSERT INTO notes (title, text) VALUES (?,?)';
    return this.storage.query(sql, [note.title, note.text]);
  }
 
  // Update an existing note with a given ID
  public updateNote(note: Note) {
    let sql = 'UPDATE notes SET title = \"' + note.title + '\", text = \"' + note.text + '\" WHERE id = \"' + note.id + '\"';
    this.storage.query(sql);
  }
 
  // Remoe a not with a given ID
  public removeNote(note: Note) {
    let sql = 'DELETE FROM notes WHERE id = \"' + note.id + '\"';
    this.storage.query(sql);
  }  

}

