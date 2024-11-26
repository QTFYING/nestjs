import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  public username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  public password: string;
}
