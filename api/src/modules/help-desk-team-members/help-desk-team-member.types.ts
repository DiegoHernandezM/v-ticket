export interface CreateHelpDeskTeamMemberDTO {
  teamId: number;
  userId: number;
  isActive?: boolean;
}

export interface UpdateHelpDeskTeamMemberDTO {
  isActive?: boolean;
}