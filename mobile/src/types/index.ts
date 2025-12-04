// 공통 타입 정의

export interface User {
  id: number;
  phone: string;
  profile: UserProfile;
}

export interface UserProfile {
  id: number;
  nickname: string;
  gender: 'male' | 'female' | 'other';
  ageGroup: string;
  profileImage?: string;
  mannerScore: number; // 0-100
}

export interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'senior_center' | 'cafe' | 'restaurant' | 'other';
  isAffiliated: boolean;
  currentUsers?: number;
}

export interface Meeting {
  id: number;
  title: string;
  description: string;
  location: Location;
  hostId: number;
  dateTime: Date;
  maxParticipants: number;
  currentParticipants: number;
  participationFee: number;
  status: 'open' | 'closed' | 'completed';
}

export interface Post {
  id: number;
  authorId: number;
  author: UserProfile;
  content: string;
  images: string[];
  likesCount: number;
  dislikesCount: number;
  commentsCount: number;
  createdAt: Date;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  author: UserProfile;
  content: string;
  createdAt: Date;
}


