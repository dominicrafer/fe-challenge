export interface EmployeeState {
  form: EmployeeDetails;
}

export interface EmployeeDetails {
  personal_information: {
    profile_picture: string | null;
    first_name: string | null;
    last_name: string | null;
    personal_email: string | null;
    personal_contact: string | null;
    birthdate: string | null;
    country: string | null;
    city: string | null;
    province: string | null;
    zip_code: string | null;
  };
  account_information: {
    company_email: string | null;
    company_contact: string | null;
    employee_number: string | null;
    date_hired: string | null;
    position: string | null;
  };
  documents: {
    birth_certificate: string | null;
    bir_2316: string | null;
    philhealth_pmrf: string | null;
    certificate_of_employment: string | null;
    ids: string | null;
    diploma: string | null;
  };
  additional_information: {
    hobbies: string | null;
    references: Array<string>;
    bio: string | null;
  };
}
