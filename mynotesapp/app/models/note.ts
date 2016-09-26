import { Injectable } from '@angular/core';

export class Note{
    title: string;
    text: string;
    id: number;

    /**
     *
     */
    constructor(title:string, text:string, id: number) {
        this.title = title;
        this.text = text;
        this.id = id;
    }
}
