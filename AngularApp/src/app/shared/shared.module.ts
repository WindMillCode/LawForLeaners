import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SubNavDirective } from './sub-nav.directive';
import { NavComponent } from './nav/nav.component';
import { SanitizeUrlPipe } from './sanitize-url.pipe';
import { IsYoutubePipe } from './is-youtube.pipe';
import { MobileNavComponent } from './shared/mobile-nav/mobile-nav.component';

// dev additions
import { TranslateLoader, TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
//


@NgModule({
    declarations: [
        SubNavDirective,
        NavComponent,
        SanitizeUrlPipe,
        IsYoutubePipe,
        MobileNavComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        //dev additions
        TranslateModule.forChild({
            // defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: false
        })
        //
    ],
    exports: [
        SubNavDirective,
        NavComponent,
        SanitizeUrlPipe,
        IsYoutubePipe,
        MobileNavComponent,
        TranslateModule
    ]
})
export class SharedModule { }
