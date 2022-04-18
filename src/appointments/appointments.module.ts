import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from './schemas';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Appointment', schema: AppointmentSchema }]) ],
  providers: [AppointmentsService, AppointmentsResolver],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
