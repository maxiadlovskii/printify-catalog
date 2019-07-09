import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent {
  languagesMenu = [
    {
      locale: 'en',
      name: 'English'
    },
    {
      locale: 'ru',
      name: 'Русский'
    },
    {
      locale: 'ua',
      name: 'Українська'
    }
  ]

  constructor(private translate: TranslateService) {}

  onLanguageChange(language: string) {
    this.translate.use(language)
  }
}
