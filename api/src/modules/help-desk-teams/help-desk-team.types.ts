export interface CreateHelpDeskTeamDTO {
  companyId?: number;
  name: string;
  isActive?: boolean;
}

export interface UpdateHelpDeskTeamDTO {
  companyId?: number | undefined;
  name?: string | undefined;
  isActive?: boolean | undefined;
}