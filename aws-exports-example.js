export default {
  Auth: {
    Cognito: {
      userPoolId: "",
      userPoolClientId: "",
      // identityPoolId: "",  // Required for using amplify storage
    }
  },
  // Required for using amplify storage
  Storage: {
    S3: {
      bucket: '',
      region: ''
    }
  }
};
