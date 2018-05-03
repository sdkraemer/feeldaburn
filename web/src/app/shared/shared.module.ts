import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ToggleControlComponent } from "./ui/toggle-control.component";

import {
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule,
  MatInputModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatProgressBarModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatProgressBarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ToggleControlComponent,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatProgressBarModule
  ],
  declarations: [ToggleControlComponent]
})
export class SharedModule {}
