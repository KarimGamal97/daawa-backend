import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvitationDocument = HydratedDocument<Invitation>;

@Schema({ timestamps: true })
export class Invitation {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: 'royal-night' })
  templateId: string;

  @Prop({ default: 'wedding' })
  eventType: string;

  @Prop({ default: 'gold' })
  sealStyle: string;

  @Prop({ required: true })
  groomName: string;

  @Prop({ required: true })
  brideName: string;

  @Prop({ required: true })
  weddingDate: Date;

  @Prop({ default: true })
  scratchReveal: boolean;

  @Prop({ required: true })
  venue: string;

  @Prop({ default: '' })
  venueAddress: string;

  @Prop({ default: '' })
  mapUrl: string;

  @Prop({ default: 'quran' })
  quoteType: string;

  @Prop({ default: '' })
  customQuote: string;

  @Prop({ default: '' })
  welcomeMessage: string;

  @Prop({ default: '' })
  tagline: string;

  @Prop({
    type: [
      {
        id: { type: String, required: true },
        time: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    default: [],
  })
  schedule: {
    id: string;
    time: string;
    title: string;
  }[];

  @Prop({ default: true })
  enableRsvp: boolean;

  @Prop({ default: 'templateDefault' })
  musicTrack: string;

  @Prop({ default: '' })
  customMusicName: string;

  @Prop({ default: '' })
  photoUrl: string;

  @Prop({ type: [String], default: [] })
  galleryPhotos: string[];

  @Prop({ default: '' })
  customerName: string;

  @Prop({ default: '' })
  customerPhone: string;

  @Prop({ default: '' })
  customerEmail: string;

  @Prop({ default: 'instapay' })
  paymentMethod: string;

  @Prop({ default: '' })
  paymentReference: string;

  @Prop({ default: '' })
  receiptFileName: string;

  @Prop({ default: '' })
  receiptImageUrl: string;

  @Prop({ default: 999 })
  totalPrice: number;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({
    type: [
      {
        guestName: { type: String, required: true },
        attending: { type: Boolean, default: true },
        companionsCount: { type: Number, default: 1 },
        wishMessage: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  rsvps: {
    guestName: string;
    attending: boolean;
    companionsCount: number;
    wishMessage?: string;
    createdAt?: Date;
  }[];
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
