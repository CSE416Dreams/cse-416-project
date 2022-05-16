import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
// Angular material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';


import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MapComponent } from './main-content/map/map.component';
import { SidenavContentComponent } from './main-content/sidenav-content/sidenav-content.component';
import { DistrictPlanContentComponent } from './main-content/sidenav-content/district-plan-content/district-plan-content.component';
import { StateSummaryComponent } from './main-content/sidenav-content/state-summary/state-summary.component';
import { SeawulfEnsembleSummaryComponent } from './main-content/sidenav-content/seawulf-ensemble-summary/seawulf-ensemble-summary.component';
import { CompareDialogComponent } from './main-content/sidenav-content/compare-dialog/compare-dialog.component';
import { DataSourceComponent } from './main-content/sidenav-content/data-source/data-source.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    MapComponent,
    SidenavContentComponent,
    DistrictPlanContentComponent,
    StateSummaryComponent,
    SeawulfEnsembleSummaryComponent,
    CompareDialogComponent,
    DataSourceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    NgxChartsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
