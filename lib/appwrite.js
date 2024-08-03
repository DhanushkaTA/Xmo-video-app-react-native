import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.dhanushkata.xmo',
    projectId:'66abd6740027443dc3c0',
    databaseId: "66abd8c3000ffd30efda",
    userCollectionId: "66abd92e002d75f14dcb",
    videoCollectionId: "66abd95a000527094124",
    storageId:"66abdb820005c6620456"
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId
} = appwriteConfig;


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const saveUser = async (email, password, username) => {
    try {

        console.log(email)
        console.log(password)
        console.log(username)

        const new_account = await account.create(
          ID.unique(),
          email,
          password,
          username
        );

        console.log('===========🎉=========')
    
        if (!new_account) throw Error;
    
        const avatarUrl = avatars.getInitials(username);

        console.log('===========🐋=========')
    
        await signIn(email, password);
    
        const new_user = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          ID.unique(),
          {
            accountId: new_account.$id,
            email: email,
            username: username,
            avatar: avatarUrl,
          }
        );

        console.log('===========⚠️=========')
    
        return new_user;
      } catch (error) {
        console.log(error)
        throw new Error(error);
      }
}

export const signIn = async (email, password) => {
    try{

        console.log('====================')
        console.log(email)
        console.log(password)

        const session = await 
            account.createEmailPasswordSession(email, password);

        return session;

    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
  try{

    const currentAccount = await account.get();

    console.log(currentAccount);

    if (!currentAccount) throw new Error;

    // const user = await databases.getDocument(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.userCollectionId,
    //   [Query.equal('accountId', currentAccount.$id)]
    // );

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    console.log('===========���=========')
    console.log(user.documents);

    if(!user) throw new Error;

    console.log(user.documents)

    return user.documents;

  }catch(error){
    console.log('here is ');
      console.log(error);
      throw new Error(error);
  }
}

// to get the all posts from the database

export const getAllPosts = async () => {
  try{

    const allPosts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    );

    console.log('===========���=========')
    console.log(allPosts.documents);

    return allPosts.documents;

  }catch(error){
    throw new Error(error);
  }
}

// to get the latest posts from the database
export const getLatestPosts = async () => {
  try{

    const allPosts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc(`$createdAt`, Query.limit(7))]
    );

    console.log('===========���=========')
    console.log(allPosts.documents);

    return allPosts.documents;

  }catch(error){
    throw new Error(error);
  }
}

// to get the search posts from the database
export const searchPosts = async (query) => {
  try{

    const allPosts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search(`title`, query)]
    );

    console.log('===========��searchPosts��=========')
    console.log(allPosts.documents);
    console.log(allPosts.documents.length);

    return allPosts.documents;

  }catch(error){
    throw new Error(error);
  }
}

// to get theuser posts from the database
export const getUserPosts = async (userId) => {
  try{

    const allPosts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal(`creator`, userId)]
    );

    console.log('===========��userPosts��=========')
    console.log(allPosts.documents);
    console.log(allPosts.documents.length);

    return allPosts.documents;

  }catch(error){
    throw new Error(error);
  }
}

// to logout 
export const logout = async () => {
  try{

   const session = await account.deleteSession('current')

    return session;

  }catch(error){
    throw new Error(error);
  }
}

// to upload video 
export const createPost = async (form, thumbnail, video, userId) => {
  try{

    console.log('🎉 🐳 🐳 🐳 file upload');
    
    console.log(form.thumbnail);

    console.log('🎉 🐳 🐳 🐳 file thumbnail');

    console.log(form.thumbnail);
    

  //  const [thumbnailUrl, videoUrl] = await Promise.all(
  //    [
  //      uploadFile(form.thumbnali, 'image'),
  //      uploadFile(form.video, 'video'),
  //    ],
  //  )

  const [thumbnailUrl, videoUrl] = await Promise.all(
    [
      uploadFile(thumbnail, 'image'),
      uploadFile(video, 'video'),
    ],
  )

  console.log("user is",userId);
  

   const newPost = await databases.createDocument(
    databaseId,
    videoCollectionId,
    ID.unique(),
    {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      creator: form.userId,
    }
  );

  return newPost;

  }catch(error){
    throw new Error(error);
  }
}

// to upload File
export async function uploadFile(file, type) {
  if (!file) return;

  console.log('���������������');
  console.log(file);
  

  // const { mimeType, ...rest } = file;
  // const asset = { type: mimeType, ...rest };

  console.log('👽 🥲 💌');
  console.log(file);

  const asset = {
    name: "imag"+Date.now()+".jpg",
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
}

console.log(asset);


  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    console.log('����Upload file�����');
    console.log(file);

    console.log('👽👽👽👽👽');
    console.log(uploadedFile);

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.log(error);
    
    throw new Error(error);
  }
}

// tp get file url
export const getFilePreview = async(fileId, type) => {

  let fileUrl;

  try{

    if(type === 'video'){
      fileUrl = storage.getFileView(storageId, fileId)
    }else if(type === 'image'){
      fileUrl = storage.getFilePreview(storageId,fileId, 2000, 2000, 'top', 100)
    }else{
      throw new Error('Invalid file type')
    }

    if(!fileUrl) throw Error;

    return fileUrl;
  }catch (error) {
    throw new Error(error);
  }

}