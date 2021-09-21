import { Component, OnInit, ChangeDetectionStrategy ,HostBinding, ChangeDetectorRef} from '@angular/core';
import { RyberService } from 'src/app/ryber.service';
import {Subscription}from 'rxjs';
import { classPrefix } from 'src/app/customExports';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

    // metadata
    @HostBinding('class') class = "a_p_p_NavView"
    subscriptions:[] = []
    nav = this.ryber.nav
    prefix ={
        main:classPrefix({view:"NavMainPod"}),
        view: classPrefix({view:"Nav"}),
        header:classPrefix({view:"NavHeader"}),
    }
    subs: Subscription[] = [];
    //

    constructor(
        public ryber:RyberService,
        private ref:ChangeDetectorRef
    ) { }

    ngOnInit(): void {

        let {ryber,nav,ref} = this
        ryber.cmsInit.subscribe(()=>{

            nav = ryber.nav
            ref.detectChanges()
        })
    }



    ngOnDestroy(): void {
        let {subscriptions} = this
        subscriptions
        .forEach((x:any,i)=>{
            x.unsubscribe()
        })
    }
}
