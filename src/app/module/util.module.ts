import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingBlockViewComponent } from "../loading-block-view/loading-block-view.component";
import { AngularMaterialModule } from "./angular-material.module";

@NgModule({
  declarations: [
    LoadingBlockViewComponent
  ],
  exports: [
    LoadingBlockViewComponent
  ]
  , imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class UtilModule { }
