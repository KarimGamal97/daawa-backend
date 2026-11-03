import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invitation, InvitationDocument } from './schemas/invitation.schema.js';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectModel(Invitation.name)
    private invitationModel: Model<InvitationDocument>,
  ) {}

  async create(createInvitationDto: Record<string, unknown>): Promise<Invitation> {
    const baseSlug = String(createInvitationDto.slug || `invite-${Date.now().toString().slice(-5)}`);
    const existing = await this.invitationModel.findOne({ slug: baseSlug }).exec();
    if (existing) {
      createInvitationDto.slug = `${baseSlug}-${Math.floor(100 + Math.random() * 900)}`;
    }
    const newInvitation = new this.invitationModel(createInvitationDto);
    return newInvitation.save();
  }

  async findAll(): Promise<Invitation[]> {
    return this.invitationModel.find().sort({ createdAt: -1 }).exec();
  }

  async findBySlug(slug: string): Promise<Invitation> {
    const invitation = await this.invitationModel.findOne({ slug }).exec();
    if (!invitation) {
      throw new NotFoundException(`Invitation with slug '${slug}' not found`);
    }
    return invitation;
  }

  async updateStatus(slug: string, status: string): Promise<Invitation> {
    const invitation = await this.invitationModel
      .findOneAndUpdate({ slug }, { $set: { status } }, { new: true })
      .exec();

    if (!invitation) {
      throw new NotFoundException(`Invitation with slug '${slug}' not found`);
    }
    return invitation;
  }

  async addRsvp(slug: string, rsvpDto: Record<string, unknown>): Promise<Invitation> {
    const invitation = await this.invitationModel
      .findOneAndUpdate(
        { slug },
        { $push: { rsvps: rsvpDto } },
        { new: true },
      )
      .exec();

    if (!invitation) {
      throw new NotFoundException(`Invitation with slug '${slug}' not found`);
    }
    return invitation;
  }
}
