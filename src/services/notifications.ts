/**
 * Local notifications only (offline mock).
 * Real remote push (FCM/APNs) needs a backend — not used here.
 * Self-chat schedules a local notification so you can test the UX.
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
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#1b3fc2',
        sound: 'default',
        enableVibrate: true,
        showBadge: true,
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
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
  delaySeconds?: number;
};

/** WhatsApp-style: name, message preview, View message / Mark as read */
export async function showMessageNotification(p: MessageNotifParams) {
  try {
    const delay = p.delaySeconds ?? (p.isSelf ? 1.5 : 0);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: p.name,
        subtitle: p.isSelf ? 'Message yourself' : undefined,
        body: p.body,
        sound: 'default',
        data: {
          chatId: p.chatId,
          name: p.name,
          action: 'open_chat',
          isYou: p.isSelf ? '1' : '0',
        },
        categoryIdentifier: NOTIF_CATEGORY,
        badge: 1,
        ...(Platform.OS === 'android'
          ? {
              channelId: 'messages',
              priority: Notifications.AndroidNotificationPriority.MAX,
              color: '#1b3fc2',
              sticky: false,
            }
          : {}),
      },
      trigger:
        delay > 0
          ? {
              type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
              seconds: delay,
              repeats: false,
            }
          : null,
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
      isYou?: string;
    };
    const actionId = response.actionIdentifier;
    if (data?.chatId) {
      const name =
        data.chatId === 'you' || data.isYou === '1'
          ? 'You'
          : data.name || 'Chat';
      handler(data.chatId, name, actionId);
    }
  });
}
