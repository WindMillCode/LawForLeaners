import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { environment as env } from 'src/environments/environment';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';

// dev additions
import {TranslateLoader, TranslateModule,TranslatePipe} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
//


if(env.production){

    Object.entries(console)
    .forEach((x,i)=>{
        let [key,val] = x
        if(typeof val === "function"){
            (console[key] as any) = ()=>{}
        }
    })
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,

    // dev additions
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        isolate : false
    }),
    //
  ],
  providers: [

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
