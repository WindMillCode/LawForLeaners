import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
    providedIn: 'root'
})
export class RyberService {

    constructor(
        public router: Router,
        public http: HttpClient,
        public translate:TranslateService
    ) {
        translate.setDefaultLang("en")
    }

    cmsInit:Subject<any> = new Subject<any>();

    nav :any= {
        title:{
            text:"Law for Learners"
        },
        subtitle:{
            text:"Bengali Law Firm"
        },
        links:{
            items:Array(8).fill(null)
            .map((x:any,i)=>{
                return {
                    link:{
                        text:["HOME","ABOUT","MODLUES","VIDEOS",
                        "PUBLICATIONS","INTERNSHIPS","BLOG","CONTACT US"][i],
                        mouseenter:(evt)=>{
                            this.nav.links.items[i].subPod.style.display = "flex"

                        },
                        mouseleave:(evt)=>{
                            this.nav.links.items[i].subPod.style.display = "none"
                            // debugger
                        }
                    },
                    subPod:{
                        style:{}
                    },
                    subLink:Array(8).fill(null)
                    .map((y:any,j)=>{
                        return [
                            [],
                            ["APPRECIATION","OUR TEAM"].map((z:any,k)=>{
                                z ={text:z}
                                return z
                            }),
                            ["GUIDELINES","BASIC COURSES","ADVANCED COURSES"]
                            .map((z:any,k)=>{
                                z ={text:z}
                                return z
                            })
                        ][j]
                    })[i]
                }
            }),
        },
        mobileLinks:{
            icon:{
                click:(evt:Event)=>{
                    if(this.nav.mobileLinks.view.style.display === "flex"){
                        this.nav.mobileLinks.subPod.style.display = "none"
                        this.nav.mobileLinks.view.style.display = "none"

                    }
                    else{
                        this.nav.mobileLinks.subPod.style.display = "none"
                        this.nav.mobileLinks.view.style.display = "flex"

                    }
                }
            },
            view:{
                style:{}
            },
            subPod:{
                style:{},
                items:[],
                translateIndex:0
            },
            items:Array(8).fill(null)
            .map((x:any,i)=>{
                return {
                    link:{
                        text:["HOME","ABOUT","MODULES","VIDEOS",
                        "PUBLICATIONS","INTERNSHIPS","BLOG","CONTACT US"][i],
                        click:(evt)=>{
                            let {router} =this
                            this.nav.mobileLinks.subPod.style.display =
                            this.nav.mobileLinks.subPod.style.display === "block"
                            ? "none" :"block"
                            
                            if(this.nav.mobileLinks.subPod.translateIndex !== i){
                                this.nav.mobileLinks.subPod.style.display = "block"
                            }
                            if(
                                this.nav.mobileLinks.items[i].subLink?.length === 0 ||
                                !this.nav.mobileLinks.items[i].subLink

                            ){
                                // hide the navigation
                                this.nav.mobileLinks.view.style.display = "none"
                                //
                                router.navigateByUrl("/"+this.nav.mobileLinks.items[i].link.text.toLowerCase())
                            }
                            else{
                                this.nav.mobileLinks.subPod.items = this.nav.mobileLinks.items[i].subLink
                                this.nav.mobileLinks.subPod.translateIndex = i
                            }

                        },

                    },
                    subLink:Array(8).fill(null)
                    .map((y:any,j)=>{

                        let click = (devObj)=>{
                            let {z} = devObj
                            return (evt)=>{
                                let {router} =this
                                this.nav.mobileLinks.subPod.style.display = "none"
                                router.navigateByUrl("/"+z.split(" ").join("_").toLowerCase())
                            }
                        }
                        return [
                            [],
                            ["APPRECIATION","OUR TEAM"].map((z:any,k)=>{
                                let newZ ={
                                    text:z,
                                    click:click({z})
                                }
                                return newZ
                            }),
                            ["GUIDELINES","BASIC COURSES","ADVANCED COURSES"]
                            .map((z:any,k)=>{
                                let newZ ={
                                    text:z,
                                    click:click({z})
                                }
                                return newZ
                            })
                        ][j]
                    })[i]
                }
            })
        }
    }
    about :any= {

    }
    home:any = {
        title:{
            text:"Welcome to Law For Leaners"
        },
        subtitle:{
            text:"Lawyer Zahid Hossain Best Lawyer in NYC"
        },
        offer:{
            text:"What we Offer"
        },
        offerlist:{
            items:["CERTIFICATE COURSES","COMPETITIONS","PUBLICATIONS","INTERNSHIPS"]
            .map((x:any,i)=>{
                return {
                    title:{
                        text:x
                    },
                    desc:{
                        text:[
                            "Learn the Law in a New Way",
                            "Participate, Learn and Win Big",
                            "Publish in our flagship Journal- The Bengali National Law Review",
                            "We promise enriching experience of learning"
                        ][i]
                    },
                    button:{
                        text:[
                            "APPLY NOW",
                            "START WINNING",
                            "PUBLISH",
                            "INTERN WITH US"
                        ][i]
                    }
                }
            })
        },
        footer:{
            text:"Law For Learners"
        },
        footernotes:{
            items:[
                "@2010-2018 Law For Learners",
                "THE LAW FOR LEARNERS PRIVATE LIMITED",
                "ALL RIGHTS RESERVED"
            ]
            .map((x:any,i)=>{
                return {
                    text:x
                }
            })
        }
    }
    videos:any = {
        title:{
            text:"Videos"
        },
        content:{
            items:[
                "Lecture 1 on the Preamble of the Constitution",
            ]
            .map((x:any,i)=>{
                return {
                    title:{
                        text:x
                    },
                    url:{
                        text:[`https://www.youtube.com/embed/0B0Ik5WTKcI`][0]
                    },
                    desc:{
                        text:[
                            `This lecture on the preamble of the Constitution includes
                            a basic textual analysis of the preamble. It includes a
                            discussion on the features of the preamble and makes a
                            comparative study between the preambles to the Constitutions
                            of Bangladesh and India`
                        ][0]
                    }
                }
            })
        }
    }
}
