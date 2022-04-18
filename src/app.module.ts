import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './configuration/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],    
    }),
    GraphQLModule.forRoot({ 
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(process.env.MONGO_CNN),
    AuthModule,
    UsersModule,
    AppointmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
