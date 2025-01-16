import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'togglePassword'
})
export class TogglePasswordPipe implements PipeTransform {
  transform(showPassword: boolean): string {
    return showPassword ? 'text' : 'password';
  }
}
