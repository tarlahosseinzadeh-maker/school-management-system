import {
  createPreRegistration as createPreRegistrationRepository,
  findPreRegistrations,
} from "@/src/repositories/preRegistration.repository";


import type {
  CreatePreRegistrationInput,
} from "@/src/validation/preRegistration.validation";





export async function createPreRegistration(

  data: CreatePreRegistrationInput

) {


  return await createPreRegistrationRepository(

    data

  );

}






export async function getPreRegistrations() {


  return await findPreRegistrations();


}