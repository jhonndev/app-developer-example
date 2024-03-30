import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';

import { environment } from '@env/environment';
import { Logger, UntilDestroy } from '@shared';
import { AuthenticationService } from './authentication.service';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  isError: boolean = true;
  loginForm!: FormGroup;
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private platform: Platform,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  async login() {
    try {
      await this.authenticationService.login(this.loginForm.value);
      this.isError = true;
    } catch (error: any) {
      console.error('Error login: ', error);
      this.isError = false;
    }
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
