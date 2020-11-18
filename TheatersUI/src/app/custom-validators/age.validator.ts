import { AbstractControl } from '@angular/forms';

export function AgeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  let date = new Date(control.value);
  let now = new Date(Date.now());
  let differ = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);
  if (differ / 365 < 18) return { age: true };
  return null;
}
