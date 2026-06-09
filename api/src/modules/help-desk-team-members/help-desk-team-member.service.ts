import { AppError } from '../../utils/app-error';
import { AuthUser } from '../../types/auth-user.type';
import { HelpDeskTeamRepository } from '../help-desk-teams/help-desk-team.repository';
import { UserRepository } from '../users/user.repository';
import { HelpDeskTeamMemberRepository } from './help-desk-team-member.repository';
import {
  CreateHelpDeskTeamMemberDTO,
  UpdateHelpDeskTeamMemberDTO,
} from './help-desk-team-member.types';

export class HelpDeskTeamMemberService {
  private memberRepository = new HelpDeskTeamMemberRepository();
  private teamRepository = new HelpDeskTeamRepository();
  private userRepository = new UserRepository();

  async create(data: CreateHelpDeskTeamMemberDTO, authUser: AuthUser) {
    const team =
      authUser.role === 'super_admin'
        ? await this.teamRepository.findById(data.teamId)
        : await this.teamRepository.findByIdAndCompany(
            data.teamId,
            authUser.companyId!
          );

    if (!team) {
      throw new AppError('Mesa de ayuda no encontrada', 404);
    }

    const user = await this.userRepository.findByIdWithCompanyRoles(data.userId);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const belongsToCompany = user.companyUsers.some(
      (companyUser: any) =>
        companyUser.companyId === team.companyId &&
        companyUser.isActive === true
    );

    if (!belongsToCompany) {
      throw new AppError('El usuario no pertenece a la empresa de la mesa de ayuda', 403);
    }

    const isEngineer = user.companyUsers.some(
      (companyUser: any) =>
        companyUser.companyId === team.companyId &&
        companyUser.isActive === true &&
        companyUser.role?.slug === 'engineer'
    );

    if (!isEngineer) {
      throw new AppError('El usuario debe tener rol engineer para pertenecer a una mesa de ayuda', 400);
    }

    const exists = await this.memberRepository.findByTeamAndUser(
      data.teamId,
      data.userId
    );

    if (exists && exists.isActive) {
      throw new AppError('El usuario ya pertenece a esta mesa de ayuda', 409);
    }

    if (exists && !exists.isActive) {
      return this.memberRepository.update(exists.id, {
        isActive: true,
      });
    }

    return this.memberRepository.create({
      teamId: data.teamId,
      userId: data.userId,
      isActive: data.isActive ?? true,
    });
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.memberRepository.findAll();
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.memberRepository.findAllByCompany(authUser.companyId);
  }

  async findById(id: number, authUser: AuthUser) {
    const member =
      authUser.role === 'super_admin'
        ? await this.memberRepository.findById(id)
        : await this.memberRepository.findByIdAndCompany(id, authUser.companyId!);

    if (!member) {
      throw new AppError('Miembro de mesa de ayuda no encontrado', 404);
    }

    return member;
  }

  async findByTeamId(teamId: number, authUser: AuthUser) {
    const team =
      authUser.role === 'super_admin'
        ? await this.teamRepository.findById(teamId)
        : await this.teamRepository.findByIdAndCompany(
            teamId,
            authUser.companyId!
          );

    if (!team) {
      throw new AppError('Mesa de ayuda no encontrada', 404);
    }

    return this.memberRepository.findByTeamId(teamId);
  }

  async update(
    id: number,
    data: UpdateHelpDeskTeamMemberDTO,
    authUser: AuthUser
  ) {
    await this.findById(id, authUser);

    return this.memberRepository.update(id, data);
  }

  async delete(id: number, authUser: AuthUser) {
    await this.findById(id, authUser);

    return this.memberRepository.delete(id);
  }
}