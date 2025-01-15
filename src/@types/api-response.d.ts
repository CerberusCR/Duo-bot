interface ApiResponse {
  users: User[];
}

interface User {
  joinedClassroomIds: any[]; // If it's an array, you can define the type of its elements, if known
  streak: number;
  motivation: string;
  acquisitionSurveyReason: string;
  shouldForceConnectPhoneNumber: boolean;
  picture: string;
  learningLanguage: string;
  shakeToReportEnabled: boolean | null;
  liveOpsFeatures: any[]; // Type of elements can be defined if known
  canUseModerationTools: boolean;
  id: number;
  betaStatus: string;
  hasGoogleId: boolean;
  privacySettings: any[]; // Type of elements can be defined if known
  fromLanguage: string;
  hasRecentActivity15: boolean;
  _achievements: any[]; // Type of elements can be defined if known
  observedClassroomIds: any[]; // Type of elements can be defined if known
  username: string;
  bio: string;
  profileCountry: string | null;
  chinaUserModerationRecords: any[]; // Type of elements can be defined if known
  globalAmbassadorStatus: object; // If you know the shape, you can specify it further
  currentCourseId: string;
  hasPhoneNumber: boolean;
  creationDate: number; // Unix timestamp
  achievements: any[]; // Type of elements can be defined if known
  hasPlus: boolean;
  hasFacebookId: boolean;
  roles: string[];
  classroomLeaderboardsEnabled: boolean;
  emailVerified: boolean;
  courses: Course[];
  totalXp: number;
  streakData: StreakData;
}

interface Course {
  preload: boolean;
  placementTestAvailable: boolean;
  authorId: string;
  title: string;
  learningLanguage: string;
  xp: number;
  healthEnabled: boolean;
  fromLanguage: string;
  crowns: number;
  id: string;
}

interface StreakData {
  currentStreak: number | null;
}
