import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleControlComponent } from './ui/toggle-control.component';

//From John papa: https://github.com/johnpapa/a2-first-look/blob/master/_examples/storyline-tracker/app/shared/shared.module.ts
// imports: imports the module's exports. which are usually
// declarables(components / directives / pipes) and providers.
// in our case the FilterTextModule has a provider.
//
// exports: exports modules AND declarables (components/directives/pipes) that other modules may want to use
// SharedModule does not use CommonModule, but does use FormsModule.
// Even so, we import/export both of these because most other modules will import SharedModule and will need them.
@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    CommonModule, 
    FormsModule,
    ToggleControlComponent
  ],
  declarations: [
    ToggleControlComponent
  ]
})
export class SharedModule { }