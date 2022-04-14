import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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



import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MapComponent } from './main-content/map/map.component';
import { TabsComponent } from './main-content/tabs/tabs.component';
import { CompactnessComponent } from './main-content/tabs/compactness/compactness.component';
import { DemographicsComponent } from './main-content/tabs/demographics/demographics.component';
import { GeographicsComponent } from './main-content/tabs/geographics/geographics.component';
import { PopulationMeasureComponent } from './main-content/tabs/population-measure/population-measure.component';
import { VotingMeasureComponent } from './main-content/tabs/voting-measure/voting-measure.component';
import { PlanSummaryComponent } from './main-content/tabs/plan-summary/plan-summary.component';
import { StateSummaryComponent } from './main-content/tabs/state-summary/state-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    MapComponent,
    TabsComponent,
    CompactnessComponent,
    DemographicsComponent,
    GeographicsComponent,
    PopulationMeasureComponent,
    VotingMeasureComponent,
    PlanSummaryComponent,
    StateSummaryComponent
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
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
