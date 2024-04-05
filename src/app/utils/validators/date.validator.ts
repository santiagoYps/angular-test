import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isAfter, isToday, startOfDay } from "date-fns";

export function currentOrFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const dateStr: string = control.value; 
    const [year, month, day] = dateStr.split('-').map(Number);
    const selectedDate: Date = new Date(year, month - 1, day);
    if (!selectedDate) {
      return null;
    }
    if (isToday(selectedDate) || isAfter(selectedDate, startOfDay(new Date()) ) ) {
      return null;
    }
    return { pastDate: true };
  };
}