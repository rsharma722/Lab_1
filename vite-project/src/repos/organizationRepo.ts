type CreateRoleDTO = {
  name: string;
  description?: string;
};

type Role = {
  id: number;
  name: string;
  description?: string;
};

export const organizationRepo = {
  async getRoles(): Promise<Role[]> {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/roles`);

    if (!response.ok) {
      throw new Error("Failed to fetch roles");
    }

    return response.json();
  },

  async createRole(dto: CreateRoleDTO, token: string): Promise<Role> {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create role");
    }

    return response.json();
  },
};