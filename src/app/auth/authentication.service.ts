import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Credentials, CredentialsService } from './credentials.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  MSJ_SUCCESS = 'S';
  MSJ_ERROR = 'E';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private credentialsService: CredentialsService,
    private afAuth: AngularFireAuth
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  async login(context: LoginContext) {
    try {
      await this.afAuth.signInWithEmailAndPassword(context.username, context.password);
      const data = {
        username: context.username,
        token: context.password,
      };
      this.credentialsService.setCredentials(data, context.remember);
      this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  async logout() {
    await this.afAuth.signOut();
    this.credentialsService.setCredentials();
    this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/login'], { replaceUrl: true });
  }
}
