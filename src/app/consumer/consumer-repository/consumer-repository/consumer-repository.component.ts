import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY,Observable } from 'rxjs';
import { ConsumerRepository } from 'src/app/core/models/consumer-repository';
import { ConsumerService } from 'src/app/core/services/consumer-apis/consumer.service';
import { PageEvent } from '@angular/material/paginator';
import { format } from 'date-fns';

@Component({
  selector: 'app-consumer-repository',
  templateUrl: './consumer-repository.component.html',
  styleUrls: ['./consumer-repository.component.css']
})
export class ConsumerRepositoryComponent implements OnInit {

  constructor(
    private consumerService: ConsumerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  pageEvent!: PageEvent;
  pageSize: number = 10;
  pageIndex: number = 1;
  totalLenght?: number = 100;

  user = this.route.snapshot.params['login'];

  idUser!: number;
  login!: string;
  profileUrl!: string;
  dataCriated!: string;

  consumerUserRepositories$: Observable<ConsumerRepository[]> = EMPTY;
  dataSources = new MatTableDataSource<ConsumerRepository>();
  displayedColumns: string[] = [
    'id',
    'name',
    'url'
  ]

  getUsersDetails() {
    this.consumerService.getUserDetails(this.user).subscribe((user: any) => {
      this.idUser = user.id;
      this.login = user.login;
      this.profileUrl = user.html_url;
      this.dataCriated = user.created_at;
      this.totalLenght = user.public_repos;

      const date = user.created_at;
      const formattedDate = format(new Date(date), 'MM/dd/yyyy');
      this.dataCriated = formattedDate;
    })
  }

  findUsersRepositories() {
    this.consumerService.getUserRepositories(this.user, this.pageIndex, this.pageSize).subscribe((res: any) => {
      this.dataSources.data = res
    })
  }

  loadRepositories() {
    const perPage = this.pageEvent.pageSize;
    const page = this.pageEvent.pageIndex;

    this.consumerService.getUserRepositories(this.user, page, perPage).subscribe((res: any) => {
      this.dataSources.data = res
    })
  }

  ngOnInit(): void {
    this.consumerUserRepositories$ = this.consumerService.getUserRepositories(this.user, this.pageIndex, this.pageSize)
    this.findUsersRepositories()
    this.getUsersDetails()
  }
}
