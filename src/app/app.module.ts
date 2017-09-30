import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {GlobalModules} from "./module";

@NgModule({
    ...GlobalModules,
    bootstrap: [AppComponent]
})
export class AppModule {}
