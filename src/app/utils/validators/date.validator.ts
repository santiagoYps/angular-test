import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isAfter, isToday } from "date-fns";

export function currentOrFutureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate: Date = control.value;
      console.log(selectedDate);
      if (!selectedDate) {
        return null;
      }
      if (!isAfter(selectedDate, new Date()) && !isToday(selectedDate)) {
        return { futureDate: true };
      }
      return null; 
    };
  }