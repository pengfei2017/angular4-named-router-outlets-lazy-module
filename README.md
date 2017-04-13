# angular4-named-router-outlets-lazy-module   
> 在angular2以上的版本中，命名的router-outlets如果在被懒加载的特性模块中，使用要注意的事项：声明路由时有name的<router-outlet>组件必须是它们的宿主组件的直接父路由，并且<router-outlet>们的宿主组件的路由必须要自己的名字，而不能是<router-outlet>们的宿主组件的某个上一代路由有名字，如下：像list-outlet插座组件所在的宿主组件是LayoutComponent，那么在声明路由时，path: 'list'路径必须时LayoutComponent所在路径path: 'layout'的直接下一级路径，中间不能隔代，另外宿主组件LayoutComponent必须有自己的路径名字path: 'layout'，不能为空路径
  ~~~
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
  ~~~
> 父模块可以调子模块中的插座路径，子模块中也可以调父模块中的插座路径，不管是不是懒加载模块
  ~~~
  <a
    [routerLink]="['layout', {outlets: {'list-outlet': ['list'],'detail-outlet': ['detail'], 'speaker-outlet': ['speaker'], 'bio-outlet': ['none']}}]">
    layout
  </a>
  ~~~

## 在ChildRoutingModule模块中

  1. 正确写法1如下 （正确的做法是layout路径必须直接指向有名字的插座路径<router-outlet>所在的宿主组件中，中间不能隔代）
    ~~~
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
    ~~~

1. 正确写法2如下(可以在有名字的<router-outlet>所在的宿主组件的路径path: 'layout'上面声明任意数量的空路径path: ''，方便进行无组件路由分组)
    ~~~
    const routes: Routes = [
      {
        path: '',
        component: ChildComponent,
        children: [
           {
             path: '',
             children: [
              {
                path: '',
                children: [
                  {
                    path: '', // 无组件空路由对子组件进行分组管理
                    canActivateChild: [AuthGuard], // 守卫该分组下面的所有子路由是否可以激活
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
                  }
                ]
              }
            ]
          }
        ]
      },
    ];
    ~~~

1. 错误写法1如下 （把命名的插座<router-outlet name=""></router-outlet>直接写入ChildModule模块的模块组件ChildComponent中，然后直接在模块组件ChildComponent下面写outlet路由，虽然命名的路由插座<router-outlet name=""></router-outlet>在哪个组件中，就必须要直接在该组件的直接下一级子路由中声明插座路由，中间不能跨代，即使跨代的空组件分组路由也不行，但是因为这时AppRoutingModule中声明ChildModule的懒加载路由{path: 'child', loadChildren: 'app/child/child.module#ChildModule'}中已经有了child路由的声明，并指向懒加载的模块，而懒加载的模块的模块自己的路由模块ChildRoutingModule中因为懒加载的原因，必须声明一个一级空路由指向模块组件ChildComponent，所以整个应用层面上，在child路径要间隔一个空路径''才能指向子插座路由们，好比“错误示范2”中的样子）
    ~~~
    const routes: Routes = [
      {
        path: '',
        component: ChildComponent,
        children: [
          {path: 'list', component: ListComponent, outlet: 'list-outlet'},
          {path: 'detail', component: DetailComponent, outlet: 'detail-outlet'},
          {path: 'speaker', component: SpeakersListComponent, outlet: 'speaker-outlet'},
          {path: ':id', component: BioComponent, outlet: 'bio-outlet'}
        ]
      },
    ];
    
    错误示范2 
    {path: 'child', loadChildren: 'app/child/child.module#ChildModule'，
      children: [
        {
          path: '',
          component: ChildComponent,
          children: [
            {path: 'list', component: ListComponent, outlet: 'list-outlet'},
            {path: 'detail', component: DetailComponent, outlet: 'detail-outlet'},
            {path: 'speaker', component: SpeakersListComponent, outlet: 'speaker-outlet'},
            {path: ':id', component: BioComponent, outlet: 'bio-outlet'}
          ]
        }
      ]
    }
    
    ~~~

1. 错误写法2如下（在有name的插座路由组件和它们的宿主组件之间添加了一个或者多个空路由组件，若要使用空路由组件对子路由组件进行分组管理，可以在layout组件的上一代加空组件路由，向正确范例2中那样）
    ~~~
    const routes: Routes = [
      {
        path: '',
        component: ChildComponent,
        children: [
          {
            path: 'layout',
            component: LayoutComponent,
            children: [
            {
              path: '',
              children: [
                {path: 'list', component: ListComponent, outlet: 'list-outlet'},
                {path: 'detail', component: DetailComponent, outlet: 'detail-outlet'},
                {path: 'speaker', component: SpeakersListComponent, outlet: 'speaker-outlet'},
                {path: ':id', component: BioComponent, outlet: 'bio-outlet'}
              ]
            }
            ]
          }
        ]
      },
    ];
    
    正确范例2
    const routes: Routes = [
      {
        path: '',
        component: ChildComponent,
        children: [
          {
            path: '', // 无组件空路由对子组件进行分组管理
            canActivateChild: [AuthGuard], // 守卫该分组下面的所有子路由是否可以激活
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
          }
        ]
      },
    ];
    ~~~


