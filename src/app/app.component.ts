import { Component, HostListener, OnInit } from '@angular/core'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  private selectedLang = 'en'
  private languages = ['en', 'ru', 'ua']

  constructor(private translate: TranslateService) {
    translate.addLangs(this.languages)
    translate.setDefaultLang(this.selectedLang)
    translate.use('en')
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => this.translate.use(event.lang))
  }

  @HostListener('document:keydown.control.l')
  onLanguageChange() {
    const id = this.selectedLang ? this.languages.indexOf(this.selectedLang) : 0
    const isLastItem = id === this.languages.length - 1

    if (isLastItem) {
      this.selectedLang = this.languages[0]
    } else {
      this.selectedLang = this.languages[id + 1]
    }

    this.translate.use(this.selectedLang)
  }
}
