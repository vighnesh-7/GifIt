
import {
  Account,
  Client,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.tutly.gifit",
  projectId: "668e40e3002d2694c349",
  databaseId: "668e43bc0011a0f86920",
  userCollectionId: "668e43dc002e03510110",
  videosCollectionId: "668e440d001c34ec7668",
  storageId: "668e45ac00088e8b9e02",
};


const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const db = new Databases(client);
const storage = new Storage(client);

export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("User not created");

    const avatarUrl = await avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await db.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("User not found");

    const currentUser = await db.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("User not found");

    return currentUser.documents[0];
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getFilePreview = async (fileId, type) => {
  let fileUrl = null;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFileView(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw new Error("File not found");

    return fileUrl;
  } catch (e) {
    throw new Error(e);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  try {
    const { mimeType, ...rest } = file;
    const asset = {
      name: file.fileName,
      type: file.mimeType,
      size: file.fileSize,
      uri: file.uri,
    };

    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await db.createDocument(
      config.databaseId,
      config.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        prompt: form.prompt,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (e) {
    throw new Error(e);
  }
};
