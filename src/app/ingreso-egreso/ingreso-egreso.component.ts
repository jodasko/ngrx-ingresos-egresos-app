import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss'],
})
export class IngresoEgresoComponent implements OnInit {
  ingresoEgresoForm!: FormGroup;
  typeOfAmount: TypeOfAmount = 'income';
  isIncome = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  save() {
    console.log(this.ingresoEgresoForm.value);
    console.log(this.typeOfAmount);
  }

  toggleTypeOfAmount() {
    this.isIncome = !this.isIncome;
    this.typeOfAmount = this.isIncome ? 'income' : 'expense';
  }
}

type TypeOfAmount = 'income' | 'expense';
