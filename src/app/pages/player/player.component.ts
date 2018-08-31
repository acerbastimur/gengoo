import { Component, OnInit } from '@angular/core';
import Plyr from 'plyr';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { GoogleService, GoogleObj } from '../../providers/google.services';
const SplitText = require('assets/SplitText.min.js');




@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})


export class PlayerComponent implements OnInit {
  public googleObj: GoogleObj = new GoogleObj();
  public key: string;

  currentSubtitle;
  subtitlePath;
  videoPath;  
  constructor( private route: ActivatedRoute , private _google: GoogleService) { }

  ngOnInit() {

    setInterval(() => {
      if ($('.plyr__caption').text() !== this.currentSubtitle && $('.plyr__caption').text() !== '') {
        this.currentSubtitle = $('.plyr__caption').text();
        const $quote = $('.plyr__caption');
        const mySplitText = new SplitText($quote, {
          type: 'words',
          wordsClass: 'word words++'
        });
        this.checkContainer();

      }

    }, 1000);

    ///////////////// Get Paths ////////////////////
    let paths = String(this.route.snapshot.paramMap.get('videoPath')); // Get paths from route url
    let videoPath = paths.split('+')[0]; // Get video path
    let subtitlePath = paths.split('+')[1]; // Get subtitle path
    ////////////////////////////////////////////////
    
    // Set video and subtitle path
    this.videoPath = videoPath;
    this.subtitlePath = subtitlePath;
    //////////////////////////////////

    // Start video
    this.play()
    //////////////

    //////////////// Prevent Default ////////////////////
    document.addEventListener('dragover',function(event){
      event.preventDefault();
      return false;
    },false);
  
    document.addEventListener('drop', function(event){
      event.preventDefault();
      console.log('dragged!');
      return false;
    },false);
    //////////////////////////////////////////////////////
    
  }
  //////////////////// Get clicked word //////////////////
  checkContainer() {
    if ($('.word').is(':visible')) { // Check if words are visible
       $('.word').on('click', (e) => { // İf clicked 
       const x = e.currentTarget.outerText; // Get it's text
          this.translate(x); // Call translate
          console.log('E is ',e);
          
          return; // BECAUSE, UNLESS RETURN IT SHOWS 2 TIMES 
       });
      return;
   } else {
     setTimeout(this.checkContainer, 50); // wait 50 ms, then try again
   }
 }
 ////////////////////////////////////////////////////////////
 ///////////// Translate ///////////////
 translate(text) {
  this.googleObj.q = text; // Set text that will translate
  // Call google translate function 
  this._google.translate(this.googleObj, 'AIzaSyCS8Ajivy0OSI4FjZq4c_qaH6m82nosqvo').subscribe(
    (response: any) => {
      console.log(response.data.translations[0].translatedText);
      console.log(response);
      
    },
    err => {
      console.log(err);
    }
  );
}
/////////////////////////////////////////
  play() 
    {
      // Set video's paths 
      $('#sourceVideo').attr('src', this.videoPath);
      $('#subtitles').attr('src', this.subtitlePath);
      ////////////////////////////////////////////////
  
      // Player Configuration (all of theese are default)
      const player = new Plyr('#video', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings',
          'pip', 'airplay', 'fullscreen'
        ],
        settings :[
          'captions', 'quality', 'speed', 'loop']
      });
      ///////////////////////////////////////////////////
  
  
  
    }

}
