import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CatalogComponent } from './components/catalog/catalog.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalog' },
  { path: 'catalog', component: CatalogComponent, pathMatch: 'full' },
  { path: '**', component: CatalogComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
