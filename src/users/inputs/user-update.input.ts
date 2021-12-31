import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";
@InputType()
export class UserUpdateInput {
    @Field()
    readonly id: string;
    @Field()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    password: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    readonly avatar: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    readonly status: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    readonly role: string;
}