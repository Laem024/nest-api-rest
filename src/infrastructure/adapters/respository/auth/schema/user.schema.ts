import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  user_name: string;

  @Prop({ unique: [true, 'Email en uso'] })
  user_email: string;

  @Prop()
  user_password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);