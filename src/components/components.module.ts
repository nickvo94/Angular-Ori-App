import { NgModule } from '@angular/core';
import { PagesMainComponent } from './pages-main/pages-main';
import { PagesUploadComponent } from './pages-upload/pages-upload';
import { MediaComponent } from './media/media';
@NgModule({
	declarations: [PagesMainComponent,
    PagesUploadComponent,
    MediaComponent],
	imports: [],
	exports: [PagesMainComponent,
    PagesUploadComponent,
    MediaComponent]
})
export class ComponentsModule {}
