
// PRODUCTION

// export default {
//   Auth: {
//     region: 'ap-southeast-1',
//     userPoolId: 'ap-southeast-1_CYe20f1Qm',
//     userPoolWebClientId: '5uketpl4s1isj10n89bqcuugkd',
//     identityPoolId: 'ap-southeast-1:86ecbbb2-cc38-4b64-845e-006a55a893fd'
//   },
//   Storage: {
//     AWSS3: {
//       bucket: 'oms-private-imports-prod', //REQUIRED -  Amazon S3 bucket name
//       region: 'ap-southeast-1' //OPTIONAL -  Amazon service region
//     }
//   }
// }

//STAGING

export default {
    Auth: {
      region: 'ap-southeast-2',
      userPoolId: 'ap-southeast-2_dS9Qvebr3',
      userPoolWebClientId: '3go9q95mhpdkt5p0dv6amo03d9',
      identityPoolId: 'ap-southeast-2:58e153e6-8c67-4afb-912d-827a3f26973f'
    },
    Storage: {
      AWSS3: {
        bucket: 'oms-private-imports', //REQUIRED -  Amazon S3 bucket name
        region: 'ap-southeast-2' //OPTIONAL -  Amazon service region
      }
    }
  }
