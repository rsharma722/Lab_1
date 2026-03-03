import { organization as initialOrg } from "../data/organization";
import type { Person } from "../types";

export type CreatePersonDTO = {
  firstName: string;
  lastName: string;
  role: string;
};

let people: Person[] = initialOrg;

export const organizationRepo = {
  getPeople(): Person[] {
    return people;
  },

  roleIsOccupied(role: string): boolean {
    const normalized = role.trim().toLowerCase();
    return people.some((p) => p.role.trim().toLowerCase() === normalized);
  },

  createPerson(dto: CreatePersonDTO): Person[] {
    const nextPerson: Person = {
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      role: dto.role.trim(),
    };

    people = [...people, nextPerson];
    return people;
  },
};