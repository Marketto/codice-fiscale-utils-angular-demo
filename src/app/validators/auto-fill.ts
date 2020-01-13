import { AbstractControl, ValidatorFn } from "@angular/forms";
import { Parser } from "@marketto/codice-fiscale-utils";
function autoFillGenerator(
  autoFillFn: (
    control: AbstractControl,
    ...fieldControls: AbstractControl[]
  ) => void
) {
  return (...fieldNames: string[]): ValidatorFn => (
    control: AbstractControl
  ): null => {
    if (control.parent) {
      const fieldControls: AbstractControl[] = fieldNames.map(fieldName =>
        control.parent.get(fieldName)
      );
      if (
        !fieldControls.some(
          fieldControl => !fieldControl.pristine || fieldControl.value
        )
      ) {
        autoFillFn(control, ...fieldControls);
      }
      return null;
    }
  };
}

export const cfAutoFillBirthDate: (
  birthDateFieldName: string
) => ValidatorFn = autoFillGenerator((cfControl, birthDateControl) =>
  birthDateControl.setValue(Parser.cfToBirthDate(cfControl.value))
);

export const cfAutoFillGender: (
  genderFieldName: string
) => ValidatorFn = autoFillGenerator((cfControl, genderControl) =>
  genderControl.setValue(Parser.cfToGender(cfControl.value))
);

export const cfAutoFillAreaPlace: (
  areaFieldName: string,
  placeFieldName: string
) => ValidatorFn = autoFillGenerator((cfControl, areaControl, placeControl) => {
  const birthPlace = Parser.cfToBirthPlace(cfControl.value);
  if (birthPlace) {
    areaControl.setValue(birthPlace.province);
    placeControl.setValue(birthPlace);
  }
});
