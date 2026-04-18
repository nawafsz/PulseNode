import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  constructor(private prisma: PrismaService) {}

  // Real world: Store this in DB with expiry
  private readonly resetTokens = new Map<string, string>();

  async login(email: string, name: string, username: string) {
    // Check if user exists, else create
    let user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await this.prisma.user.create({
        data: { email, name, username }
      });
      this.logger.log(`Created new user in DB: ${email}`);
    }
    return user;
  }

  async forgotPassword(email: string) {
    // Generate a random token
    const token = Math.random().toString(36).substring(2, 15);
    this.resetTokens.set(token, email);

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    
    this.logger.log(`Password reset requested for: ${email}`);
    this.logger.warn(`==== SIMULATED EMAIL ====`);
    this.logger.warn(`To: ${email}`);
    this.logger.warn(`Subject: Reset your password`);
    this.logger.warn(`Link: ${resetLink}`);
    this.logger.warn(`=========================`);

    // In a real app, use a mailer service here
    return { success: true, message: 'Reset link generated (check server logs)' };
  }

  async resetPassword(token: string, newPassword: string) {
    const email = this.resetTokens.get(token);
    if (!email) {
      return { success: false, message: 'Invalid or expired token' };
    }

    this.logger.log(`Password successfully reset for: ${email}`);
    this.resetTokens.delete(token);

    // Real world: Update user password in DB via Prisma
    return { success: true, message: 'Password updated' };
  }
}
