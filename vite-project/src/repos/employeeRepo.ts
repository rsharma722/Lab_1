export type CreateEmployeeDTO = {
  departmentName: string;
  firstName: string;
  lastName?: string;
};

export const employeeRepo = {
  async createEmployee(dto: CreateEmployeeDTO, token: string) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create employee");
    }

    return response.json();
  },
};