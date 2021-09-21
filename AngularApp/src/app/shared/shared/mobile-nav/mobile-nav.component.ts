import { Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef,HostBinding, HostListener,ViewContainerRef, Input } from '@angular/core';
import {fromEvent,iif,Subscription,of} from 'rxjs';
import { RyberService } from 'src/app/ryber.service';
import { classPrefix } from 'src/app/customExports';
import { environment as env } from 'src/environments/environment';
import { tap,take, exhaustMap, delay } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

type MobileNavLinks ={
    icon:{
        click:(Event)=>void
    }
    view:{
        style:Object
    },
    subPod:{
        style:{},
        items:{
            text:string,
            click:Function
        }[]
        translateIndex:number
    },
    items:{
        link:{
            text:string;
            click:Function
        },
        subLink:{
            text:string,
            click:Function
        }[][]
    }[],
}


@Component({
    selector: 'app-mobile-nav',
    templateUrl: './mobile-nav.component.html',
    styleUrls: ['./mobile-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileNavComponent implements OnInit {


    // metadata
    @HostBinding('class') myClass: string = "a_p_p_MobileNavView";
    @HostListener('animationend',['$event']) myAnimationEnd(event: any): void {
        let {vcf,ryber,ref} = this;
        ryber.nav.showFn({vcf,ref})
    }
    prefix ={
        main: classPrefix({view:"MobileNavMain"}),
        view: classPrefix({view:"MobileNav"}),
        pods:Array(1).fill(null)
        .map((x:any,i)=>{
            return classPrefix({view:"MobileNavPod"+i})
        })
    }
    subs: Subscription[] = [];
    //

    // dev additions
    @Input() links:MobileNavLinks ;
    //

    constructor(
        private ref: ChangeDetectorRef,
        private vcf:ViewContainerRef,
        private ryber: RyberService
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subs
        .forEach((x:any,i)=>{
            x?.unsubscribe();
        })
    }

}
