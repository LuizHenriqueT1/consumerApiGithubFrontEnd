import { ConsumerService } from './../../core/services/consumer-apis/consumer.service';
import { EMPTY, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConsumerUser } from 'src/app/core/models/consumer-user';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer-user',
  templateUrl: './consumer-user.component.html',
  styleUrls: ['./consumer-user.component.css'],
})
export class ConsumerUserComponent implements OnInit {
  constructor(
    private consumerService: ConsumerService,
    private router: Router
  ) {}

  pageEvent!: PageEvent;
  pageSize: number = 10;
  pageIndex: number = 0;
  totalItems: number = 150;
  since: number = 0;

  consumerUsers$: Observable<ConsumerUser[]> = EMPTY;
  dataSources = new MatTableDataSource<ConsumerUser>();
  displayedColumns: string[] = ['id', 'login', 'url', 'action'];



  findAllUsers() {
    this.consumerService.getUsers(this.since, this.pageSize).subscribe(res => {
      this.dataSources.data = res;
    });
  }

  previousIds: number[] = []
  onPageChange(event: PageEvent) {
    const previousPageIndex = event.previousPageIndex ?? 0;
    const pageIndex = event.pageIndex ?? 0;
    const pageSize = event.pageSize ?? 0;
    const lastUserId = this.dataSources.data[this.dataSources.data.length - 1]?.id;



    if (previousPageIndex < pageIndex) {
      const firstId = this.dataSources.data.at(0)?.id ?? 0;
      this.previousIds.push(firstId -1)
      console.log("array next", this.previousIds)
      const page = event.pageSize;

      this.consumerService.getNextPage(lastUserId, pageSize).subscribe((users) => {
        this.dataSources.data = users;
      });
    } else if (previousPageIndex > pageIndex) {
      const page = event.pageSize;
      const lastIdArrayPreviousId = this.previousIds.pop() ?? 0;

      console.log(this.previousIds)
      this.consumerService.getPreviousPage(lastIdArrayPreviousId, pageSize).subscribe((users) => {
        this.dataSources.data = users;
      });
    } else if (pageSize) {
      const page = event.pageSize;

      this.consumerService.getUsers(0, pageSize).subscribe((users) => {
        this.dataSources.data = users;
      });
    }
  }

  onDetails(user: any) {
    this.router.navigate([`/users/${user}/repos`]);
  }

  ngOnInit(): void {
    this.findAllUsers();
    this.consumerUsers$ = this.consumerService.getUsers(this.since, this.pageSize);
  }

}
