import AsyncStorage from '@react-native-async-storage/async-storage';

export class userSettings {
    nickName: string;
    network: string;

    constructor(nickName: string, network: string) {
        this.nickName = nickName;
        this.network = network;
    }
}   

export const saveUserSettings = async (settings: userSettings) =>
{
    try {
        const json = JSON.stringify(settings);
        await AsyncStorage.setItem('@user_settings', json);
    } catch (err) {
        console.error(err);
    }
}

export const loadUserSettings = async(): Promise<userSettings> =>
{
    const defaultSettings = new userSettings("test", "test2");
    try {
        const json = await AsyncStorage.getItem('@user_settings');
        if(json != null)
        {
            return JSON.parse(json);
        }
        saveUserSettings(defaultSettings);
        return defaultSettings;
    } catch (err) {
        console.error(err);
        return defaultSettings;
    }
}

export const saveBookmarks = async (bookmarks: string[]) => 
{
    try {
        const json = JSON.stringify(bookmarks);
        await AsyncStorage.setItem('@bookmarked_channels', json);
    } catch (err) {
        console.error(err);
    }
}

export const loadBookmarks = async (): Promise<string[]> => 
{
    try {
        const json = await AsyncStorage.getItem('@bookmarked_channels');
        if(json != null) {
            return JSON.parse(json);
        }

        return [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const addBookmark = async(channel: string) => 
{
    const bookmarks = await loadBookmarks();
    if(!bookmarks.includes(channel)) {
        bookmarks.push(channel);
        await saveBookmarks(bookmarks);
    }
}

export const containsBookmark = async(channel: string): Promise<boolean> =>
{
    const bookmarks = await loadBookmarks();

    return bookmarks.includes(channel);
}

