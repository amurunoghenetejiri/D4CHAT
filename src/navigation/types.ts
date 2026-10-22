export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  PhoneNumber: undefined;
  VerifyCode: undefined;
  ProfileSetup: undefined;
  MainTabs: undefined;
  Conversation: { chatId: string; name: string };
};

export type MainTabParamList = {
  Chats: undefined;
  Updates: undefined;
  Calls: undefined;
  Settings: undefined;
};
