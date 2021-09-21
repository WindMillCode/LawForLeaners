import { ChangeDetectorRef, Component } from '@angular/core';
import { RyberService } from './ryber.service';
import { environment as env } from 'src/environments/environment';
import { eventDispatcher } from './customExports';
import { fromEvent, of } from 'rxjs';
import {delay,tap} from 'rxjs/operators';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],

})
export class AppComponent {
    title = 'AngularApp';

    constructor(
        public ryber:RyberService,
        private ref:ChangeDetectorRef
    ){}


    ngOnInit(){
        let {ryber,ref} =this
        let {router,http} = ryber




        router.navigateByUrl(env.startURL)
        // grab the cms data and populate the website
        if(env.cosmic.fetchCMS){
            http.get(
                `
                ${env.cosmic.baseUrl}/v2/buckets/${env.cosmic.bucketSlug}/objects?&read_key=${env.cosmic.readKey}&props=title,type_slug,metafields
                `
            )
            .subscribe({
                next:(result:any)=>{
                    result.objects
                    .forEach((x:any,i)=>{
                        // console.log(x)

                        // might have to sepearte based on slugs
                        x.metafields.forEach((y:any,j)=>{
                            ryber[x.title][y.title] = {}
                            switch (true) {
                                case ["navlinks"].includes(y.key):
                                    let my_children = Object.fromEntries(
                                        y.children
                                        .map((z:any,k)=>{
                                            return [z.title,z]
                                        })
                                    )
                                    ryber[x.title][y.title] ={
                                        items: my_children["HEADS"].options
                                        .map((z:any,k)=>{
                                            return {
                                                link:{
                                                    text:z.value,
                                                    mouseenter:(evt)=>{
                                                        ryber.nav.links.items[k].subPod.style.display = "flex"
                                                        ref.detectChanges()

                                                    },
                                                    mouseleave:(evt)=>{
                                                        ryber.nav.links.items[k].subPod.style.display = "none"
                                                        ref.detectChanges()
                                                        // debugger
                                                    },
                                                },
                                                subPod:{
                                                    style:{
                                                    }
                                                },
                                                subLink:my_children[z.value]?.options
                                                ?.map((z:any,k)=>{
                                                    return {
                                                        text:z.value
                                                    }
                                                }) || []
                                            }
                                        })
                                    }
                                    break;

                                case ["offerlist"].includes(y.key):
                                    {
                                        let my_children = Object.values(
                                            y.children
                                        )

                                        ryber[x.title][y.title].items  = my_children
                                        .map((z:any,k)=>{
                                            return {
                                                title:{
                                                    text:z.options[0].value
                                                },
                                                desc:{
                                                    text:z.options[1].value
                                                },
                                                button:{
                                                    text:z.options[2].value
                                                }
                                            }
                                        })
                                    }
                                    break;
                                case ["content"].includes(y.key):
                                        {
                                            let my_children = Object.values(
                                                y.children
                                            )

                                            ryber[x.title][y.title].items  = my_children
                                            .map((z:any,k)=>{
                                                return {
                                                    title:{
                                                        text:z.options[0].value
                                                    },
                                                    url:{
                                                        text:z.options[1].value
                                                    },
                                                    desc:{
                                                        text:z.options[2].value
                                                    }
                                                }
                                            })
                                        }
                                        break
                                case ["footernotes"].includes(y.key):
                                    ryber[x.title][y.title].items = y.options
                                    .map((z:any,k)=>{
                                        return {
                                            text:z.value
                                        }
                                })
                                    break;
                                default:
                                    ryber[x.title][y.title] = {
                                        text:y.value
                                    }
                                    break;
                            }

                        })
                    })
                    ryber.cmsInit.next({ready:true})
                    console.log(ryber)

                },
                error:(err:any)=>{
                    console.log(err)
                }
            })
        }
        //
    }

    ngAfterViewInit(){
        fromEvent(window,"resize")
        .pipe(
            tap(
                ()=>{
                    console.log(window.innerWidth)
                }
            )
        )
        .subscribe()
    }
}
