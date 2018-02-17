import { Component } from '@angular/core';

/**
 * Generated class for the MediaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'media',
  templateUrl: 'media.html'
})
export class MediaComponent {
  constructor(
    public file: File,
    public title: string,
    public description: string,
){};
}
