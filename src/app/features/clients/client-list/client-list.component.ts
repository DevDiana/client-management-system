import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, timeout } from 'rxjs';

import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {
  private readonly clientService = inject(ClientService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  private readonly cdr = inject(ChangeDetectorRef);

  allClients: Client[] = [];
  displayedClients: Client[] = [];
  isLoadingClients = false;
  loadErrorMessage: string | null = null;

  ngOnInit(): void {
    this.loadAllClients();
  }

  loadAllClients(): void {
    this.isLoadingClients = true;
    this.loadErrorMessage = null;
    this.cdr.markForCheck();

    this.clientService
      .getAll()
      .pipe(
        timeout(5000),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoadingClients = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (clients) => {
          this.allClients = clients;
          this.displayedClients = [...clients];
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Erro ao carregar:', err);
          this.loadErrorMessage = 'Erro ao carregar clientes. O servidor está rodando?';
          this.cdr.markForCheck();
        },
      });
  }

  filterClientsBySearchTerm(term: string): void {
    const normalizedTerm = this.normalizeString(term);

    if (!normalizedTerm) {
      this.displayedClients = [...this.allClients];
    } else {
      this.displayedClients = this.allClients.filter(
        (client) =>
          this.normalizeString(client.nome).includes(normalizedTerm) ||
          this.normalizeString(client.cpf).includes(normalizedTerm) ||
          this.normalizeString(client.placa).includes(normalizedTerm),
      );
    }
    this.cdr.markForCheck();
  }

  openCreateClientDialog(): void {
    import('../client-form/client-form.component').then(({ ClientFormComponent }) => {
      const dialogRef = this.dialog.open(ClientFormComponent, {
        width: '520px',
        data: {},
      });

      dialogRef.afterClosed().subscribe((refresh) => {
        if (refresh) this.loadAllClients();
      });
    });
  }

  editClient(client: Client): void {
    import('../client-form/client-form.component').then(({ ClientFormComponent }) => {
      this.dialog
        .open(ClientFormComponent, {
          width: '520px',
          data: { client },
        })
        .afterClosed()
        .subscribe((refresh) => {
          if (refresh) this.loadAllClients();
        });
    });
  }

  deleteClient(id: string | number): void {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.isLoadingClients = true;
      this.cdr.markForCheck();

      this.clientService
        .delete(id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => {
            this.isLoadingClients = false;
            this.cdr.markForCheck();
          }),
        )
        .subscribe({
          next: () => this.loadAllClients(),
          error: () => alert('Erro ao excluir cliente.'),
        });
    }
  }

  trackClientById(_: number, client: Client): string | number {
    return client.id;
  }

  private normalizeString(value: any): string {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
