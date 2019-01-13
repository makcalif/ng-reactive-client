import { Component, OnInit } from '@angular/core'; 
//import * as EventSource from 'eventsource';
import {EventSourcePolyfill} from 'ng-event-source';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-reactive-client';
  tweets = ['a'];
  tweet: any = 'first';
  eventSource : EventSource;
  headers: HttpHeaders = new HttpHeaders();
  endPoint  = 'http://localhost:8080/tweetstream'; 

  /* constructor (private observableEventSource : ObservableEventSource) {

  } */

  ngOnInit() {

    const eventSource = new EventSourcePolyfill( this.endPoint, {headers: this.headers});
    //const eventSource = new EventSource( this.endPoint); // this doesn't work to refresh the UI with data
       eventSource.onmessage = (event => {
          //this.zone.run(() => {
            //console.log('eventSource.onmessage: ', event);
           // this.tweets = event.data;
            this.tweets.push(event.data) 
            this.tweet =event.data;  
            //debugger
            console.log('tweet data:' + this.tweet)
          //});
      });

   /*  this.eventSource = new EventSource('http://localhost:8080/tweetstream') ;
    this.eventSource.onmessage = (event) => {
      console.log('event revevied :' + event);
    } */


   /*  const observableEventSource = require('observable-event-source')

    const o = observableEventSource({
      url: 'https://skimdb.npmjs.com/registry/_changes?since=742000&feed=eventsource',
      json: true
    })

    console.log('recently changed npm packages...')
    o.map(function (update) {
      return update.id
    }).subscribe(console.log) */
  }
}
