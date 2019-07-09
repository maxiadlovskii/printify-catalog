import { Component, OnInit, HostListener } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ApiService } from '../../services/api.service'

interface TShirt {
  id: number
  title: string
  by: string
  count: number
  priceFrom: number
  pricePremium: number
  sizesCount: number
  colorsCount: number
  printProvidersCount: number
  bestseller: boolean
  img: string
}

interface Catalog {
  mens: TShirt[]
  kids: TShirt[]
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private catalog: Catalog = null
  private selectedItemId: number = null
  private itemsIds: number[] = null

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show()

    this.apiService.getItems().subscribe(
      data => {
        this.catalog = data['items']

        this.itemsIds = Object.keys(this.catalog)
          .map((category: string) => this.catalog[category].map((item: TShirt) => item.id))
          .flat()

        // imitate some network delay to show loader
        setTimeout(() => this.spinner.hide(), 1000)
      },
      () => this.spinner.hide()
    )
  }

  onItemClick(id: number) {
    this.selectedItemId = id
  }

  @HostListener('document:keydown.control.n')
  onSelect() {
    const id = this.selectedItemId ? this.itemsIds.indexOf(this.selectedItemId) : 0
    const isLastItem = id === this.itemsIds.length - 1

    if (isLastItem) {
      this.selectedItemId = this.itemsIds[0]
    } else if (!this.selectedItemId) {
      this.selectedItemId = this.itemsIds[id]
    } else {
      this.selectedItemId = this.itemsIds[id + 1]
    }

    const item = document.getElementById(String(this.selectedItemId))
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }
  }
}
