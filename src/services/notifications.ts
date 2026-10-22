/**
 * Local notifications only (offline mock).
 * Real remote push needs FCM/APNs + a backend — not used here.
 */
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const NOTIF_CATEGORY = 'MESSAGE_ACTIONS';

export async function initNotifications(): Promise<boolean> {
  try {
    const { status: existing } = await Notifications.getPermissionsAsync();
    let final = existing;
    if (existing !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      final = status;
    }
    if (final !== 'granted') return false;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('messages', {
        name: 'Messages',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#1b3fc2',
        sound: 'default',
        enableVibrate: true,
        showBadge: true,
      });
    }

    await Notifications.setNotificationCategoryAsync(NOTIF_CATEGORY, [
      {
        identifier: 'VIEW',
        buttonTitle: 'View message',
        options: { opensAppToForeground: true },
      },
      {
        identifier: 'MARK_READ',
        buttonTitle: 'Mark as read',
        options: { opensAppToForeground: false },
      },
    ]);
    return true;
  } catch {
    return false;
  }
}

export type MessageNotifParams = {
  chatId: string;
  name: string;
  body: string;
  isSelf?: boolean;
};

/** Shows a WhatsApp-style message notification (title, body, actions). */
export async function showMessageNotification(p: MessageNotifParams) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: p.name,
        body: p.body,
        sound: 'default',
        data: { chatId: p.chatId, name: p.name, action: 'open_chat' },
        categoryIdentifier: NOTIF_CATEGORY,
        badge: 1,
        ...(Platform.OS === 'android'
          ? {
              channelId: 'messages',
              priority: Notifications.AndroidNotificationPriority.HIGH,
              color: '#1b3fc2',
            }
          : {}),
      },
      trigger: null,
    });
  } catch (e) {
    console.warn('notification failed', e);
  }
}

export function addNotificationResponseListener(
  handler: (chatId: string, name: string, actionId?: string) => void,
) {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data as {
      chatId?: string;
      name?: string;
    };
    const actionId = response.actionIdentifier;
    if (data?.chatId && data?.name) {
      handler(data.chatId, data.name, actionId);
    }
  });
}
