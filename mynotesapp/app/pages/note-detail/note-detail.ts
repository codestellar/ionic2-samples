import { NavController, NavParams, ToastController} from 'ionic-angular';
import { Component } from '@angular/core';
import { Note } from '../../models/note';
import { NoteService } from '../../providers/note-service/note-service';
 
@Component({
  templateUrl: 'build/pages/note-detail/note-detail.html'
})
 
export class NoteDetailPage {
  note: Note = null;
 
  constructor(public nav: NavController, navParams: NavParams, public noteService: NoteService, private toastCtrl: ToastController) {
    let passedNote = navParams.get('note');
    // Try to initialise our note for the page
    if (passedNote !== undefined) {
      this.note = passedNote;
    } else {
      this.note = new Note('', '', null);
      this.saveNote();
    }
  }
 
  // Save our note to the DB and show a message (optional)
  public saveNote(showBadge: boolean = false) {
    if (this.note.id === null) {
      this.noteService.saveNote(this.note).then((data) => {
        // Set the automatic created id to our note
        this.note.id = data.res["insertId"];
      });
    } else {
      this.noteService.updateNote(this.note);
    }
    if (showBadge) {
      let toast = this.toastCtrl.create({
         message: 'Note saved',
         duration: 3000
       });
      toast.present();
    }
  }
 
  // Called when this page is popped from the nav stack
  private onPageWillUnload() {
    this.saveNote(true);
  }
}