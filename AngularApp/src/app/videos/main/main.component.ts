import { Component, OnInit, ChangeDetectionStrategy ,HostBinding, ChangeDetectorRef} from '@angular/core';
import { RyberService } from 'src/app/ryber.service';
import {Subscription}from 'rxjs'
import {DomSanitizer} from '@angular/platform-browser';
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

    // metadata
    @HostBinding('class') class = "a_p_p_VideosView"
    subscriptions:[] = []
    //

    constructor(
        public ryber:RyberService,
        private ref:ChangeDetectorRef,
        private sanitizer:DomSanitizer
    ) { }

    ngOnInit(): void {
        let {ryber,videos,ref} = this
        ryber.cmsInit.subscribe(()=>{
            videos = ryber.videos
            ref.detectChanges()
        })
    }

    videos = this.ryber.videos

    ngOnDestroy(): void {
        let {subscriptions} = this
        subscriptions
        .forEach((x:any,i)=>{
            x.unsubscribe()
        })
    }

}
