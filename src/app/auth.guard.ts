import { CanActivateFn, Router } from '@angular/router';
import { auth } from './config/firebase';

export const authGuard: CanActivateFn = (route, state) => {

  const user = auth.currentUser;
  if (user) {
    return true; // User is authenticated
  } else {
    const router = new Router();
    router.navigate(['/login'])
    return false;

  }
};
