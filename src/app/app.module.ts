import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {GlobalModules} from './module';
import { PostComponent } from './pages/post/post.component';

@NgModule({
    ...GlobalModules,
    bootstrap: [AppComponent]
})
export class AppModule {}
