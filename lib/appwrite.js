import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.dhanushkata.xmo',
    projectId:'66abd6740027443dc3c0',
    databaseId: "66abd8c3000ffd30efda",
    userCollectionId: "66abd92e002d75f14dcb",
    videoCollectionId: "66abd95a000527094124",
    storageId:"66abdb820005c6620456"
}


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