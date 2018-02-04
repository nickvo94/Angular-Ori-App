import { NgModule } from '@angular/core';
import { PagesMainComponent } from './pages-main/pages-main';
import { PagesUploadComponent } from './pages-upload/pages-upload';
@NgModule({
	declarations: [PagesMainComponent,
    PagesUploadComponent],
	imports: [],
	exports: [PagesMainComponent,
    PagesUploadComponent]
})
export class ComponentsModule {}
