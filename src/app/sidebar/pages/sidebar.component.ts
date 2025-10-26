import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarHeaderComponent } from "../components/sidebar-header/sidebar-header.component";
import { SidebarOptionsComponent } from '../components/sidebar-options/sidebar-options.component';

@Component({
  selector: 'sidebar',
  imports: [SidebarHeaderComponent, SidebarOptionsComponent, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
