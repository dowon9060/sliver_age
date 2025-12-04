import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private notificationGateway: NotificationGateway) {}

  async sendNotification(userId: number, notification: any): Promise<void> {
    // Socket.io로 실시간 알림 전송
    this.notificationGateway.sendNotification(userId, notification);

    // TODO: FCM 푸시 알림 전송
    // await this.sendFCMNotification(userId, notification);
  }

  async sendMeetingNotification(meetingId: number, type: string, data: any): Promise<void> {
    // 모임 관련 알림 (참여자들에게 전송)
    // 구현 로직
  }

  // private async sendFCMNotification(userId: number, notification: any): Promise<void> {
  //   // Firebase Admin SDK를 사용한 푸시 알림
  // }
}

