import {Component, OnInit} from '@angular/core';
import {NgProgress} from 'ngx-progressbar';
import {NavigationEnd, NavigationStart, Router, Event, NavigationCancel, NavigationError} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private ngProgress: NgProgress, private router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            switch (event.constructor) {
                case NavigationStart:
                    this.ngProgress.start();
                    break;
                case NavigationEnd:
                case NavigationCancel:
                case NavigationError:
                    this.ngProgress.done();
                    break;
            }
        });
    }
}
