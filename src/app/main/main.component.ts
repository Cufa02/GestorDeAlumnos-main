import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <main>
      <ng-content/>
    </main>
  `,
  styleUrls: ['./main.component.css']
})
export class MainComponent {

}
