import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChildRoutingModule} from './child-routing.module';

import {ChildComponent} from './child.component';
import {LayoutComponent} from './layout/layout.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {SpeakersListComponent} from './speakers-list/speakers-list.component';
import {BioComponent} from './bio/bio.component';

@NgModule({
  imports: [
    CommonModule,
    ChildRoutingModule
  ],
  declarations: [
    ChildComponent,
    LayoutComponent,
    ListComponent,
    DetailComponent,
    SpeakersListComponent,
    BioComponent
  ]
})
export class ChildModule {
}
