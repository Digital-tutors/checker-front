import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { delay } from 'rxjs/operators';

import { SidebarService } from '@share/services/sidebar.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('sidebar', { read: ViewContainerRef })
  private sidebar: ViewContainerRef;

  constructor(public sidebarService: SidebarService, private r: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
    this.handleSidebarChange();
  }

  private handleSidebarChange(): void {
    this.sidebarService.sidebar$.pipe(delay(0)).subscribe(sidebar => {
      if (sidebar) {
        const factory = this.r.resolveComponentFactory(sidebar);
        this.sidebar.clear();
        this.sidebar.createComponent(factory);
      } else {
        this.sidebar.clear();
      }
    });
  }
}
