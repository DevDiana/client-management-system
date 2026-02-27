import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ClientService } from '../../../core/services/client.service';
import { MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Client } from '../../../core/models/client.model';
import { MatIconModule } from '@angular/material/icon';

interface ClientDialogData {
  client?: Client;
}

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogActions,
  ],
})
export class ClientFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly clientService = inject(ClientService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogRef = inject(MatDialogRef<ClientFormComponent>);
  private readonly data = inject<ClientDialogData>(MAT_DIALOG_DATA, { optional: true });

  public form!: FormGroup;
  public isLoading = false;
  public errorMessage: string | null = null;
  public isEditMode = false;

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      cpf: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      placa: ['', [Validators.required]],
    });
  }

  private checkEditMode(): void {
    if (this.data?.client) {
      this.isEditMode = true;
      this.form.patchValue(this.data.client);
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.executeRequest();
  }

  private executeRequest(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const clientData = this.form.getRawValue();

    const request$ =
      this.isEditMode && this.data?.client?.id
        ? this.clientService.update(this.data.client.id, clientData)
        : this.clientService.create(clientData);

    request$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          this.errorMessage = 'Ocorreu um erro ao salvar os dados. Tente novamente.';
          console.error('[ClientForm] Error:', err);
        },
      });
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }
}
