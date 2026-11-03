import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { InvitationsService } from './invitations.service.js';

@Controller('api/invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  async create(@Body() createInvitationDto: Record<string, unknown>) {
    return this.invitationsService.create(createInvitationDto);
  }

  @Get()
  async findAll() {
    return this.invitationsService.findAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.invitationsService.findBySlug(slug);
  }

  @Patch(':slug/status')
  async updateStatus(
    @Param('slug') slug: string,
    @Body('status') status: string,
  ) {
    return this.invitationsService.updateStatus(slug, status);
  }

  @Post(':slug/rsvp')
  async addRsvp(
    @Param('slug') slug: string,
    @Body() rsvpDto: Record<string, unknown>,
  ) {
    return this.invitationsService.addRsvp(slug, rsvpDto);
  }
}
