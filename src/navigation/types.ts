export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  PhoneNumber: undefined;
  VerifyCode: { phone?: string };
  ProfileSetup: undefined;
  MainTabs: undefined;
  Conversation: { chatId: string; name: string; isGroup?: boolean; isYou?: boolean };
  ContactInfo: { chatId: string; name: string; isGroup?: boolean };
  MyProfile: undefined;
  Search: undefined;
  Archived: undefined;
  NewChat: undefined;
  NewGroup: undefined;
  InviteFriend: undefined;
  PostStatus: undefined;
  VoiceCall: { name: string };
  VideoCall: { name: string };
  Privacy: undefined;
  Notifications: undefined;
  StorageData: undefined;
  LinkedDevices: undefined;
  Account: undefined;
  Placeholder: { title: string };
  EditProfile: undefined;
  PrivacySecurity: undefined;
  CreateGroup: undefined;
  ArchivedChats: undefined;
};

export type MainTabParamList = {
  Chats: undefined;
  Moments: undefined;
  Calls: undefined;
  Settings: undefined;
};
