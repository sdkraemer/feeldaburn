import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { GuidesRoutingModule, routedComponents } from "./guides.routing";

import { SharedModule } from "../shared/shared.module";
import { GuideService } from "./guide.service";

import { GuideListComponent } from "./guide-list.component";

@NgModule({
  imports: [SharedModule, GuidesRoutingModule, ReactiveFormsModule],
  exports: [],
  declarations: [GuideListComponent, routedComponents],
  providers: [GuideService]
})
export class GuidesModule {}
