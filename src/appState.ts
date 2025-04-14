import AsyncStorage from '@react-native-async-storage/async-storage';

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
