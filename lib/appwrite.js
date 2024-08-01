import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';


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

export const saveUser = async ({email, password, username}) => {
    // Register User
    try{

        console.log(email)
        console.log(password)
        console.log(username)

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const new_user = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        return new_user;

    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async ({email, password}) => {
    try{

        const session = await 
            account.createEmailPasswordSession(email, password);

        return session;

    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}

export function saveAccount(){
   
}