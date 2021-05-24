import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuardService } from "../auth/auth.guard.service";
import { SharedModule } from "../shared/shared.module";
import { ProfileComponent } from "./profile.component";

@NgModule({
    declarations: [ ProfileComponent],
    imports: [
        RouterModule.forChild( [  {path:'', component:ProfileComponent,   canActivate:[AuthGuardService]}    ]),
        CommonModule,
        FormsModule,
        SharedModule,
    ],
    exports: []
})

export class ProfileModule{}