import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

  

import { MainComponent } from './main/main.component';
import { TabsComponent } from './tabs/tabs.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SidenavServiceService } from './services/sidenav-service.service';
import { OverviewComponent } from './tabs/overview/overview.component';
import { GraphsComponent } from './tabs/graphs/graphs.component';
import { DialogComponent } from './dialog/dialog.component';
import { AdditionalDistrictsComponent } from './tabs/additional-districts/additional-districts.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TabsComponent,
    HeaderComponent,
    MainContentComponent,
    OverviewComponent,
    GraphsComponent,
    DialogComponent,
    AdditionalDistrictsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatListModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [SidenavServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
