import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SubNavDirective } from './sub-nav.directive';
import { NavComponent } from './nav/nav.component';
import { SanitizeUrlPipe } from './sanitize-url.pipe';
import { IsYoutubePipe } from './is-youtube.pipe';


@NgModule({
    declarations: [
        SubNavDirective,
        NavComponent,
        SanitizeUrlPipe,
        IsYoutubePipe
    ],
    imports: [
        CommonModule,
        SharedRoutingModule
    ],
    exports: [
        SubNavDirective,
        NavComponent,
        SanitizeUrlPipe,
        IsYoutubePipe
    ]
})
export class SharedModule { }
