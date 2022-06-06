export interface UserDto {
  id: number;
  username: string;
  name: string;
  age: number;
  /**
   * This makes User entity incompatible with this dto
   */
  _: () => 'user.dto';
}
