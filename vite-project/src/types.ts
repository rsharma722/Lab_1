export interface Employee {
  firstName: string;
  lastName?: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}

export interface Role {
  firstName: string;
  lastName: string;
  role: string;
}


export type Person = {
  firstName: string;
  lastName: string;
  role: string;
};