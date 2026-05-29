import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    regNo: { type: String, required: true, unique: true, trim: true },
    branch: { type: String, default: '' },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

// Set password (hash)
userSchema.methods.setPassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(12);
  this.passwordHash = await bcrypt.hash(plainPassword, salt);
};

// Verify password
userSchema.methods.validatePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

// Hide passwordHash when converting to JSON
userSchema.set('toJSON', {
  transform: (_, obj) => {
    delete obj.passwordHash;
    delete obj.__v;
    return obj;
  },
});

export default mongoose.model('User', userSchema);
