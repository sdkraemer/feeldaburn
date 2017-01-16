import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GuidesRoutingModule, routedComponents } from './guides.routing';

import { SharedModule } from '../shared/shared.module';
import { GuideService } from './guide.service';

import { GuideListComponent } from './guide-list.component';
import { GuideSidedSelectorComponent } from './guide-sided-selector.component';


@NgModule({
    imports: [
        SharedModule,
        GuidesRoutingModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        GuideListComponent,
        GuideSidedSelectorComponent,
        routedComponents
    ],
    providers: [
        GuideService
    ],
})
export class GuidesModule { }
