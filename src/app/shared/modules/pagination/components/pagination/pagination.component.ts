import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from "../../../../services/utils.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps!: number | null
  @Input('limit') limitProps!: number
  @Input('url') urlProps!: string
  @Input('currentPage') currentPageProps!: number

  public pagesCount!: number
  public pages!: number[]

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalProps! / this.limitProps)
    this.pages = this.utilsService.range(1, this.pagesCount)
  }

}
