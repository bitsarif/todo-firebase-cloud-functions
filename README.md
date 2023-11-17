# Firebase setup
This code sets up the Firebase emulator for local development. 
To use the emulator, follow these steps:
1. Install the Firebase CLI by running `npm install -g firebase-tools`
2. Start the emulator by running `firebase emulators:start`
3. In your code, replace the Firebase configuration with the emulator configuration:
   ```
   firebase_admin.initialize_app(
     options={
       'projectId': 'my-project-id',
       'databaseURL': 'http://localhost:9000/?ns=my-project-id',
       'storageBucket': 'my-project-id.appspot.com'
     }
   )
   ```
   Note that you should replace `my-project-id` with your actual project ID.

