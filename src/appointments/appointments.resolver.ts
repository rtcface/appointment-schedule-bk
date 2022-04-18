import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { AppointmentsRegisterDto } from './dtos/appointments.register.dto';
import { AppointmentsRegisterInput } from './inputs/appointments.register.input';

@Resolver()
export class AppointmentsResolver {
    constructor( private readonly aps:AppointmentsService ) {}


    @Mutation(() => AppointmentsRegisterDto)
    async createAppointment(
        @Args('input') input: AppointmentsRegisterInput,
    ) {
        return this.aps.register(input);
    }


}
