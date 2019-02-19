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
  events = ['a'];
  event: any = 'event not yet received';
  eventCount : number = 0;
  eventSource : EventSource;
  headers: HttpHeaders = new HttpHeaders();
  //endPoint  = 'http://localhost:8080/kafkastream3'; 
  //endPoint  = 'http://localhost:8080/streamCars'; 
  //endPoint  = 'http://localhost:8080/infiniteCars'; 
  endPoint  = 'http://localhost:8080/events'; 

  ngOnInit() {

    const eventSource = new EventSourcePolyfill( this.endPoint, {headers: this.headers});
    //const eventSource = new EventSource( this.endPoint); // this doesn't work to refresh the UI with data
       eventSource.onmessage = (e => { 
            
            this.event =e.data;  
             
            console.log('event data:' + this.event)
            this.eventCount ++;
          //});
      });
 
  }
}
