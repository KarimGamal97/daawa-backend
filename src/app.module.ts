import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { InvitationsModule } from './invitations/invitations.module.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kariimgamal1997_db_user:AaKfUL5UZVTdDyV8@menujet.6djwkys.mongodb.net/daawa-db?retryWrites=true&w=majority'),
    InvitationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}