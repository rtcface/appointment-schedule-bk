import { Field, InputType } from '@nestjs/graphql';
import { IsDate,  IsMongoId } from 'class-validator';
@InputType()
export class AppointmentsRegisterInput {
    @IsDate()
    @Field()
    readonly date: Date;
    @IsMongoId()
    @Field()
    readonly user: string;
    @IsMongoId()
    @Field()
    readonly provider: string;
    
}