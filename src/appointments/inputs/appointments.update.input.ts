import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class AppointmentsRegisterDto {
    @Field(() => ID)
    readonly id: string;
    @Field()
    readonly date: string;
    @Field()
    readonly user: string;
    @Field()
    readonly provider: string;
    @Field()
    readonly status: string;
    @Field()
    readonly updatedAt: string;
}