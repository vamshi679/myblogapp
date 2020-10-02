import { NgModule } from '@angular/core';
// angular material 
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion'; 

import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


const materialAPIs = [
  // material
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDialogModule,
  MatTabsModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
  MatSnackBarModule,
  LayoutModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatExpansionModule
]

@NgModule({
  imports: [materialAPIs],
  exports: [materialAPIs]
})
export class MaterialModule { }
