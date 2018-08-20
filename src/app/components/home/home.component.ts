import { Component, OnInit } from '@angular/core';
const SplitText = require('assets/SplitText.min.js');
import Plyr from 'plyr';
import * as $ from 'jquery';
import { GoogleService, GoogleObj } from '../../providers/google.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GoogleService]

})
export class HomeComponent implements OnInit {

  public googleObj: GoogleObj = new GoogleObj();
  public key: string;

  path;
  subtitlePath;
  videoPath;
  currentSubtitle = '';
  public currentWord = '';
  constructor(private _google: GoogleService) {
  }

  ngOnInit() {

    setInterval(() => {
      if ($('.plyr__caption').text() !== this.currentSubtitle && $('.plyr__caption').text() !== '') {
      //  console.log('subtitle changed', $('.plyr__caption').text());
        this.currentSubtitle = $('.plyr__caption').text();
        const $quote = $('.plyr__caption');
        const mySplitText = new SplitText($quote, {
          type: 'words',
          wordsClass: 'word words++'
        });
        this.checkContainer();

      }

    }, 1000);


  }

  checkContainer() {
     if ($('.word').is(':visible')) {
     // console.log('OPENED');
        $('.word').on('click', (e) => {
        const x = e.currentTarget.outerText;
        console.log(e);
           this.translate(x);
        });
       return;
    } else {
     // console.log('KAPALI');
      setTimeout(this.checkContainer, 50); // wait 50 ms, then try again
    }
  }

  translate(text) {
    console.log(text);

    this.googleObj.q = text;
    this._google.translate(this.googleObj, 'AIzaSyCS8Ajivy0OSI4FjZq4c_qaH6m82nosqvo').subscribe(
      (res: any) => {
        console.log(res.data.translations[0].translatedText);
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  play() {
    this.subtitlePath = document.querySelectorAll('input')[1].files[0].path;
    this.videoPath = document.querySelectorAll('input')[0].files[0].path;
    // console.log(this.subtitlePath, this.videoPath);
    $('#sourceVideo').attr('src', this.videoPath);
    $('#subtitles').attr('src', this.subtitlePath);

    const player = new Plyr('#video', {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings',
        'pip', 'airplay', 'fullscreen'
      ]
    });




  }
}

