import { Component, OnInit, ChangeDetectionStrategy ,HostBinding, ChangeDetectorRef} from '@angular/core';
import { RyberService } from 'src/app/ryber.service';
import {Subscription}from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

    // metadata
    @HostBinding('class') class = " a_p_p_HomeView"
    subscriptions:[] = []
    //

    constructor(
        public ryber:RyberService,
        private ref:ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        let {ryber,home,ref} = this
        ryber.cmsInit.subscribe(()=>{
            home = ryber.home
            ref.detectChanges()
        })
    }

    home = this.ryber.home

    ngOnDestroy(): void {
        let {subscriptions} = this
        subscriptions
        .forEach((x:any,i)=>{
            x.unsubscribe()
        })
    }

}
