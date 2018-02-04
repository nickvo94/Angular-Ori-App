import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadMediaPage } from './upload-media';

@NgModule({
  declarations: [
    UploadMediaPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadMediaPage),
  ],
})
export class UploadMediaPageModule {}
