import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {registerAction} from "../../store/actions/register.action";
import {Observable} from "rxjs";
import {isSubmittingSelector, validationErrorsSelector} from "../../store/selectors";
import {RegisterRequestInterface} from "../../types/registerRequest.interface";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isSubmitting$!: Observable<boolean>
  public backendErrors$!: Observable<BackendErrorsInterface | null>
  public form!: FormGroup

  constructor(private fb: FormBuilder,
              private store: Store) { }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  public initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  public initializeForm(): void {
    this.form = this.fb.group({
      username: '',
      email: '',
      password: '',
    })
  }

  public onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
  }
}
