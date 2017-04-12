import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ChildComponent} from './child.component';
import {LayoutComponent} from './layout/layout.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {SpeakersListComponent} from './speakers-list/speakers-list.component';
import {BioComponent} from './bio/bio.component';

const routes: Routes = [
  {
    path: '',
    component: ChildComponent,
    children: [
      {
        path: 'layout',
        component: LayoutComponent,
        children: [
          {path: 'list', component: ListComponent, outlet: 'list-outlet'},
          {path: 'detail', component: DetailComponent, outlet: 'detail-outlet'},
          {path: 'speaker', component: SpeakersListComponent, outlet: 'speaker-outlet'},
          {path: ':id', component: BioComponent, outlet: 'bio-outlet'}
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutingModule {
}
