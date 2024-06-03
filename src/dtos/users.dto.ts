import { IsEmail, IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { IUser } from 'interfaces';

export class CreateUserDto implements IUser{
  @IsOptional() @IsNumber()
  public id: number;

  @IsNotEmpty() @IsString()
  @Expose()
  public name: string;

  @IsOptional() @IsString()
  @Expose()
  public firstname: string;

  @IsNotEmpty() @IsEmail()
  @Expose()
  public email: string;

  @IsNotEmpty() @IsString()
  @Expose()
  public password: string;

  @IsOptional() @IsString()
  public organisation: string;

  @IsOptional() @IsNumber()
  @Expose()
  public language: number;

  @IsNotEmpty() @IsNumber()
  @Expose()
  public role: number;
}

export class UpdateUserDto implements IUser{
  @IsOptional() @IsNumber()
  @Expose()
  public id: number;

  @IsOptional() @IsNotEmpty() @IsString()
  @Expose()
  public name: string;

  @IsOptional() @IsString()
  @Expose()
  public firstname: string;

  @IsOptional() @IsNotEmpty() @IsEmail()
  @Expose()
  public email: string;

  @IsOptional() @IsNotEmpty() @IsString()
  @Expose()
  public password: string;

  @IsOptional() @IsString()
  public organisationid: string;

  @IsOptional() @IsNumber()
  @Expose()
  public language: number;

  @IsOptional() @IsNumber()
  @Expose()
  public role: number;
}