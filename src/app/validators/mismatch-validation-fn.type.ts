import ValidationError from "./validation-error.type";
import { CFMismatchValidator } from "@marketto/codice-fiscale-utils";

export type MismatchValidationFn = (
  cfValidator: CFMismatchValidator,
  codiceFiscaleFormControlValue: string,
  secondFieldControlValue: unknown
) => ValidationError;
