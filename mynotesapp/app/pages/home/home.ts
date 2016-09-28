import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController } from 'ionic-angular';
import { Note } from '../../models/note';
import { NoteService } from '../../providers/note-service/note-service';
import { NoteDetailPage } from '../note-detail/note-detail';
import { Truncate } from '../../pipes/truncate';
import { SocialSharing } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [Truncate]
})
export class HomePage {
  notes: Note[];
  
  constructor(public navCtrl: NavController, public noteService: NoteService
  , public platform: Platform
  , public actionsheetCtrl: ActionSheetController) {
    
  }
  
  // Initialise the notes by loading data from our DB
  private loadNotes() {
    this.notes = [];
    this.noteService.getNotes().then(
      data => {
        this.notes = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.notes.push(new Note(item.title, item.text, item.id));
          }
        }
      });
  }
 
  // Push the details page bute without an existing note
  public addNote() {
    this.navCtrl.push(NoteDetailPage);
  }
 
  // Push the details page for our selected Note
  public noteSelected(item: Note) {
    this.navCtrl.push(NoteDetailPage, {'note': item});
  }
 
  // Remove the note from the DB and our current arra
  public removeNote(note: Note) {
    this.noteService.removeNote(note);
    let index = this.notes.indexOf(note);
 
    if (index > -1) {
      this.notes.splice(index, 1);
    }
  }
 
  // Load our todos once the page appears
  private onPageDidEnter() {
    this.loadNotes();
  }

 openActionSheet() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Share',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Facebook',
          icon: !this.platform.is('ios') ? 'logo-facebook' : null,
          handler: () => {
            this.facebookShare();
          }
        },
        {
          text: 'WhatsApp',
          icon: !this.platform.is('ios') ? 'logo-whatsapp' : null,
          handler: () => {
            this.whatsappShare();
          }
        },
        {  
          text: 'Twitter',
          icon: !this.platform.is('ios') ? 'logo-twitter' : null,
          handler: () => {
            this.twitterShare();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present()
  }

    whatsappShare(){
    SocialSharing.shareViaWhatsApp("Message via WhatsApp", null /*Image*/,  "http://github.com/codestellar" /* url */)
      .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }

  twitterShare(){
    SocialSharing.shareViaTwitter("Message via Twitter",null /*Image*/,"http://github.com/codestellar")
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }

  facebookShare(){
    SocialSharing.shareViaFacebook("Message via Twitter",null /*Image*/,"http://github.com/codestellar")
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }

  otherShare(){
    SocialSharing.share("Genral Share Sheet",null/*Subject*/,null/*File*/,"http://github.com/codestellar")
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })

  }

}
