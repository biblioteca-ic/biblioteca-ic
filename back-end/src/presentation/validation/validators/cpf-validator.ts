import { InvalidFormatError } from '../../errors/invalid-form-error'
import { CpfChecker } from '../protocols/cpf-checker'
import { Validation } from '../protocols/validation'

export class CpfValidator implements Validation {
  constructor (
    private readonly fieldName: string,
  ) { }

  validate (input: any): Error {
    if (input[this.fieldName]) {

      if (input[this.fieldName].length !== 11 || !this.isCpfValid(input[this.fieldName])) {
        return new InvalidFormatError(this.fieldName)
      }
    }
  }

  private verifyDivisionRest(cpf_lenght_validator: number, cpf: string) {
    let sum = 0;
    let division_rest;
    let validator = cpf_lenght_validator === 9 ? 10 : 11

    for (let i = 0; i < cpf_lenght_validator; ++i) { 
      sum += parseInt(cpf[i]) * (validator - i); 
    }

    division_rest = 11 - (sum % 11)

    if (division_rest == 10 || division_rest == 11) { 
      division_rest = 0; 
    }

    if (division_rest != parseInt(cpf[cpf_lenght_validator])) { 
      return false; 
    }

    return true
  }

  private isCpfValid (cpf: string): boolean {

    if(cpf == "00000000000" ||
      cpf == "00000000000" || 
      cpf == "11111111111" || 
      cpf == "22222222222" || 
      cpf == "33333333333" || 
      cpf == "44444444444" || 
      cpf == "55555555555" || 
      cpf == "66666666666" || 
      cpf == "77777777777" || 
      cpf == "88888888888" || 
      cpf == "99999999999"
    ) {
      return false;
    }
    
    if(this.verifyDivisionRest(9, cpf) && this.verifyDivisionRest(10, cpf)) {
      return true
    }

    return false
  }
}






// let sum = 0;
//     let division_rest;

//     for (let i = 0; i < 9; ++i) { 
//       sum += parseInt(cpf[i]) * (10 - i); 

//       division_rest = 11 - (sum % 11)
  
//       if (division_rest == 10 || division_rest == 11) { 
//         division_rest = 0; 
//       }
  
//       if (division_rest != parseInt(cpf[9])) { 
//         return false; 
//       }
//     }
    
//     sum = 0
    
//     for (let i = 0; i < 10; ++i) { 
//       sum += parseInt(cpf[i]) * (11 - i); 

//     }

//     division_rest = 11 - (sum % 11)

//     if (division_rest == 10 || division_rest == 11) { 
//       division_rest = 0; 
//     }

//     if (division_rest != parseInt(cpf[10])) { 
//       return false; 
//     }


//     return true