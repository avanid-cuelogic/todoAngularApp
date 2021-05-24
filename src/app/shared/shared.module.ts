import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { FilterPipe } from "./filters.pipe";
import { DateFilterPipe } from "./fiterDate.pipe";
import { AlertComponent } from "./alert/alert.component";

@NgModule({
    declarations: [LoadingSpinnerComponent, FilterPipe, DateFilterPipe, AlertComponent],
    imports: [CommonModule],
    exports: [ LoadingSpinnerComponent, CommonModule, FilterPipe, DateFilterPipe,AlertComponent]
})

export class SharedModule { }
