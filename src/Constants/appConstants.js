export const APP_DETAILS = {
  NAME: 'testedme',
};

export const DATEFORMATS = {
  TESTDETAILS: 'DD MMM YYYY hh:mm a',
  TESTDATE: 'DD MMM YYYY',
  PROFILE_HEALTH_TEST: 'YYYY-MM-DD',
  TEMPERATURE_DATA: 'YYYY-MM-DD hh:mm:ss',
  PROFILE_HEALTH_SPACED: 'YYYY MM DD',
  HEALTH_TEST_RESULT: 'YYYY-MM-DD, hh A',
  COMPANY_ADDITION: 'MMM YYYY',
  ABOUT_VERSION: 'DD.MM.YYYY',
  VACCINE_DATE: 'DD/MM/YYYY',
  TEMPERATURE_DATE: 'YYYY-MM-DD hh:mm:ssz',
};

export const sharingTypes = {
  me: 'me',
  dynamicLink: 'dynamicLink',
};

export const testMethodsInitial = 'A swab of my nose or throat';

export const docTypes = {
  PROFILE: 'profile',
  HEALTH: 'health',
  VACCINE: 'vaccine',
};
export const cameraError = 'CameraUnAuthorized';

export const shareOption = {
  MEQR: 'MEQR',
  PROFILELINK: 'profileLink',
};

export const pushCategories = {
  updateTemperature: '1',
  updateHealthTest: '2',
  hikTemperatureUpdate: '3',
  companyUpdate: '4',
  meNotification: '5',
  jumioVerified: '7',
  jumioFailure: '8',
  permissionUpdate: '9',
  verificationPermissionUpdate: '11',
  healthTestApproved: '12',
  healthTestRejected: '13',
  vaccineApproved: '15',
  vaccineRejected: '16',
};

export const healthStatuses = {
  great: 0,
  normal: 1,
  notsure: 2,
  notwell: 3,
};

export const modalStatus = {
  profileModalsClosed: -1,
};

export const profileScreenRow = {
  health: 1,
  temperature: 2,
  vaccine: 3,
};

export const temperatureSource = {
  User_Added: 0,
  HIK_Camera: 1,
  Thermal_Scanner: 2,
};

export const businessRequest = {
  accept: 5,
  reject: 6,
};

export const profileModals = {
  closeModal: -1,
  temparatureUpdateModal: 1,
  feelingUpdateModal: 2,
  HealthUpdateModal: 3,
  companyUpdateModal: 4,
  companyRemoveModal: 5,
  JumioSuccess: 9,
  jumioFailure: 10,
  contactHR: 11,
  checkOutInfoPopUp: 12,
  checkOutPopUp: 13,
  removeVaccine: 14,
  vaccineReminder: 15,
  vaccine: 16,
  permissionUpdate: 17,
  removeHealthTest: 18,
  visitorScanIn: 19,
  healthTestApproved: 21,
  verificationPermissionUpdate: 22,
  rejectTest: 23,
  verifyVaccine: 24,
  vaccineApproved: 25,
  vaccineRejected: 27,
};

export const notificationType = {
  temparatureUpdateModal: 1,
  feelingUpdateModal: 2,
  HealthUpdateModal: 3,
  companyUpdateModal: 4,
  companyRemoveModal: 5,
  notCheckedInForWork: 6,
  jumioVerified: 7,
  jumioFailure: 8,
  permissionUpdate: 9,
  employeeRemoved: 10,
  addMedicalProfessional: 11,
  healthTestApproved: 12,
  healthTestRejected: 13,
  removeMedicalProfessional: 14,
  vaccineVerifyApproved: 15,
  vaccineVerifyRejected: 16,
};

export const companyInvitationStatus = {
  notResponded: 3,
};

export const healthTestDataFieldName = {
  photo: 'photo',
  centre: 'centre',
  type: 'type',
  date: 'date',
  result: 'result',
  how: 'how',
};
export const appState = {
  foreground: 'foreground',
  background: 'background',
};
export const alertModal = {
  logout: 1,
};

export const signUpSteps = {
  OTP: '3',
  VerifyDocuments: '4',
  Feeling: '5',
  Temperature: '6',
  HealthTest: '7',
  Profile: 12,
};

export const temperatureUnits = {
  celsius: 1,
  fahrenheit: 2,
};

export const temperatureType = {
  C: '°C',
  F: '°F',
  celsiusWithDegree: '°C',
  fahrenheitWithDegree: '°F',
  Thermal_Scanner: 'Thermal Scanner',
  HIK_Camera: 'HIK Camera',
  User_Added: 'User Added',
};

export const screenSource = {
  EDIT_DETAILS: 'Edit',
  PROFILE: 'Profile',
  EDIT_VACCINE: 'Edit vaccine',
  ADD_VACCINE: 'Add vaccine',
  HEALTH_RESULTS: 'Health results',
  OTHER_USER_PROFILE: 'Other user profile',
  TEMPERATURE: 'Temperature',
  VACCINE: 'Vaccine',
};

export const apiError = {
  badRequest: 400,
  notFound: 404,
  notAuthorized: 401,
  forbidden: 403,
  serverIssue: 500,
};

export const requestMethods = {
  post: 'POST',
  put: 'PUT',
  get: 'GET',
  delete: 'DELETE',
  patch: 'PATCH',
};

export const TestResult = {
  Positive: 'Positive',
  Negative: 'Negative',
};
export const appStoreLink =
  'https://apps.apple.com/gb/app/tested-me/id1523785240';
export const playStoreLink =
  'https://play.google.com/store/apps/details?id=com.tested.me.production&hl=en';

export const temperatureDefaultValues = {
  celsius: '37',
  fahrenheit: '98',
};

export const temperatureMaxRangeLimit = {
  celsius: '42.5',
  fahrenheit: '108.5',
};
export const temperatureCriticalLimit = {
  celsius: 37.8,
  fahrenheit: 100.04,
};

export const modalIds = {
  walkThrough: 1,
  profileModal: 2,
  vanueScan: 3,
  addNewTemperature: 4,
  addNewHealthTest: 5,
  addRemoveCompany: 6,
  openOtherUserProfile: 7,
  meAccessAsk: 8,
  JumioSuccess: 9,
  jumioFailure: 10,
  vaccine: 16,
  permissionUpdate: 17,
  visitorScanIn: 20,
  healthTestApproved: 21,
  verificationPermissionUpdate: 22,
  testRejected: 23,
  vaccineApproved: 25,
  vaccineAcceptRejectPopup: 26,
  vaccineRejected: 27,
  MEQRCode: 28,
};

export const shareHistory = {
  GENERAL_PROFILE: {type: 'GENERAL PROFILE', value: 'General profile'},
  HEALTH_TEST_RESULTS: {
    type: 'HEALTH TEST RESULTS',
    value: 'Health test results',
  },
  CONTACT_DETAILS: {type: 'CONTACT DETAILS', value: 'Contact details'},
  SCANNED_COMPANY: {type: 'CONTACT DETAILS', value: 'Scanned in to '},
  PROFILE: {type: 'PROFILE', value: 'Profile'},
};

export const testIds = {
  emailSignIn: 'Email@1',
  passwordSignIn: 'Password@1',
  signIn: 'Continue@1',
  continueToNextBenefit: 'ContinueToNextBenefit',
  gotoSignInFromBenefits: 'GotoSignInFromBenefits',
  passwordForgotten: 'PasswordForgotten',
  continueToBenefits: 'ContinueToBenefits',
  firstTut: 'FirstTut',
  skipTutID: 'skipTutID',
  addTestBtn: 'addTestBtn',
  addTemperatureButton: 'addTemperatureButton',
  skipFeeling: 'skipFeeling',
  continueTemperatureAdd: 'continueTemperatureAdd',
  temperatureSwitch: 'temperatureSwitch',
  profileScroll: 'profileScroll',
  title: 'Title',
  titlePicker: 'TitlePicker',
  firstName: 'FirstName',
  lastName: 'LastName',
  middleName: 'MiddleName',
  continueToContactDetails: 'ContinueToContactDetails',
  forgottenPasswordEmailField: 'ForgottenPasswordEmailField',
  sendLinkToEmailToResetPassword: 'SendLinkToEmailToResetPassword',
  addEmail: 'addEmail',
  addPassword: 'addPassword',
  phone: 'Phone',
  checkBox: 'CheckBox',
  eye: 'Eye',
  logout: 'Log out',
  settingsTab: 'Settings, tab, 3 of 3',
  continue: 'Continue',
  skip: 'Skip',
  otpTextInput: 'textInput',
  resendOtp: 'ResendOtp',
  feelingOne: 'FeelingOne',
  feelingTwo: 'FeelingTwo',
  feelingThree: 'FeelingThree',
  feelingFour: 'FeelingFour',
  selectFeh: 'SelectFeh',
  selectCel: 'SelectCel',
  passwordSettings: 'Password Settings',
  oldPassword: 'oldPassword',
  newPassword: 'newPassword',
  confirmPassword: 'confirmPassword',
  updatePasswordBtn: 'updatePasswordBtn',
  shareIDBtn: 'shareIDBtn',
  shareMeBtn: 'shareMeBtn',
  QRCode: 'QRCode',
  addAnotherTest: 'AddAnotherTest',
  deleteTest: 'DeleteTest',
  centre: 'Centre',
  type: 'Type',
  testDate: 'TestDate',
  testResult: 'TestResult',
  how: 'How',
  imagePicker: 'ImagePicker',
  temperaturePickerInt: 'temperaturePickerInt',
  tempPickerDec: 'tempPickerDec',
  profileTab: 'Profile, tab, 1 of 3',
  notificationTab: 'Notifications, tab, 2 of 3',
  temperatureResults: 'Temperature Results',
  addNew: 'Add new',
  shareHistory: 'Share history',
  healthTestsResults: 'Health tests results',
  edit: 'Edit',
  remoteWorkToggle: 'Remote Work Toggle',
  workingRemotely: 'Remote work status',
  personalAndContactDetails: 'Personal & Contact details',
  updateContactDetails: 'Update Contact Details',
  appVersion: 'About this app version',
  invite: 'Invite your friends',
  inviteVia: 'Invite via',
  btnJumioFailedTryAgain: 'btnJumioFailedTryAgain',
  myCompany: 'My company',
  closeHRPopUp: 'closeHRPopUp',
  addVaccine: 'addVaccine',
  vaccineSwitch: 'vaccineSwitch',
  appBuild: 'appBuild',
  loader: 'loader',
  healthTestResult: 'healthTestResult',
  vaccinationResults: 'Vaccination results',
  vaccine: 'vaccine',
  deleteVaccine: 'Delete vaccine',
  vaccineName: 'vaccine name',
  vaccineCentre: 'vaccine centre',
  vaccineDate: 'vaccine date',
  vaccineExpirationDate: 'vaccine expiration date',
  editVaccineDetails: 'edit vaccine date',
  profilePicBtn: 'profilePicBtn',
  verify: 'verify',
  notificationHealthTest: 'How are you feeling today? Update tested.me',
  scanMe: 'scan ME',
  process: 'process',
  illegible: 'Document illegible',
  confirmRejection: 'Confirm rejection',
  verifiedTxtSettings: 'verifiedTxtSettings',
  approveTest: 'approveTest',
  rejectTest: 'rejectTest',
  addNewVaccine: 'addNewVaccine',
  profileTestDate: 'profileTestDate',
  picker: 'picker',
  datePicker: 'datePicker',
  medicalApproverSettings: 'Medical Data Approver',
  triggerMedicalApproverFlow: 'triggerMedicalApproverFlow',
  btnMedicalApproverUKLocation: 'btnMedicalApproverUKLocation',
  medicalApproverCheckBox: 'medicalApproverCheckBox',
  btnConfirmMedicalApproverLocation: 'btnConfirmMedicalApproverLocation',
  imgCongratsMedicalApprover: 'imgCongratsMedicalApprover',
  saveHealthTest: 'saveHealthTest',
  txtFieldMedicalApproverTitle: 'txtFieldMedicalApproverTitle',
  txtFieldUKMedicalApproverGMC: 'txtFieldUKMedicalApproverGMC',
  btnConfirmMedicalApprover: 'btnConfirmMedicalApprover',
  btnMedicalApproverUSLocation: 'btnMedicalApproverUSLocation',
  txtFieldMedicalApproverLicense: 'txtFieldMedicalApproverLicense',
  pickerMedicalApproverState: 'pickerMedicalApproverState',
  confirmDeleteVaccine: 'confirmDeleteVaccine',
  testCentreTitle: 'Test centre',
  confirmDeleteHealthTest: 'confirmDeleteHealthTest',
  skipTest: 'skipTest',
};

export const analyticsIds = {
  scan_me_btn: 'scan_me_btn',
  share_id_ME: 'share_id_ME',
  share_id_link: 'share_id_link',
  profile_health_test_started: 'Start_health_test_profile',
  profile_health_test_finished: 'Finish_health_test_profile',
  share_app_sms: 'Invite_friends_SMS',
  share_app_social: 'Invite_friends_via',
  onboard_benefit: 'onboard_benefit',
  start_personal_details: 'start_personal_details',
  finish_personal_details: 'finish_personal_details',
  finish_contact_details: 'finish_contact_details',
  otp_added: 'otp_added',
  otp_resend: 'otp_resend',
  jumio_started: 'jumio_started',
  jumio_skipped: 'jumio_skipped',
  onboard_feeling_added: 'onboard_feeling_added',
  onboard_feeling_skipped: 'onboard_feeling_skipped',
  onboard_temp_added: 'onboard_temp_added',
  onboard_temp_skipped: 'onboard_temp_skipped',
  onboard_test_skipped: 'onboard_test_skipped',
  onboard_faceId_added: 'onboard_faceId_activiated',
  onboard_faceId_skipped: 'onboard_faceId_skipped',
  onboard_touchId_added: 'onboard_touchId_added',
  onboard_touchId_skipped: 'onboard_touchId_skipped',
  profile_vaccination_started: 'Add_vaccinations_profile',
  profile_temp_started: 'Add_temperature_profile',
  onboard_health_test_finished: 'onboard_health_test_finished',
  onboard_health_test_started: 'onboard_health_test_started',
  healthResultsScreen_health_test_finished: 'Finish_health_test_settings',
  healthResultsScreen_test_started: 'Start_health_test_settings',
  temp_finished: 'temp_finished',
  finish_vaccine_settings: 'Finish_vaccine_settings',
  finish_vaccine_profile: 'Finish_vaccine_profile',
  VaccinationResults: 'VaccinationResults',
  Add_vaccination_settings: 'Add_vaccinations_settings',
  tempResultsScreen_temp_added: 'Add_temperature_settings',
  tempResultsScreen: 'TempResults',
  approve_health_test: 'Approve_Test',
  healthResultsScreen_edit_health_test: 'healthResultsScreen_edit_health_test',
  healthResultsScreen_delete_health_test:
    'healthResultsScreen_delete_health_test',
  got_added_as_verifier: 'gotAddedAsVerifier',
  process_test: 'Process_test',
  settings_vaccine_screenName: 'Settings_vaccination',
  my_company: 'My_Company',
  process_vaccine: 'Process_vaccine',
  trigger_medical_approver_flow: 'trigger_medical_approver_flow',
  submit_medical_approver_UK: 'submit_medical_approver_UK',
  submit_medical_approver_USA: 'submit_medical_approver_USA',
  submit_medical_approver_other_location:
    'submit_medical_approver_other_location',
};

export const testCaseChecks = {
  SignIn: {
    WantToTestLoginFunctionality: 'WantToTestLoginFunctionality',
    WantToTestForgottenPasswordButtonFunctionality:
      'WantToTestForgottenPasswordFunctionality',
    WantToTestContinueButtonFunctionality:
      'WantToTestContinueButtonFunctionality',
  },
  Benefits: {
    WantToTestContinueButtonFunctionality:
      'WantToTestContinueButtonFunctionality',
    WantToTestSignInButtonFunctionality: 'WantToTestSignInButtonFunctionality',
  },
};
export const defaultCountryCode = 'GB';
export const defaultCallingCode = '44';

export const HealthTestScreen = 'HealthTests';

export const jumioErrorCode = 'G00000';

export const profileStatCodes = {
  GREEN: 'Green',
  RED: 'Red',
  AMBER: 'Amber',
  WHITE: 'White',
};

export const fieldTypes = {
  TEXT_FIELD: 'TF',
  BUTTON: 'Button',
};

export const vaccineStatCodes = {
  GREEN: 'Green',
  RED: 'Red',
  AMBER: 'Amber',
  WHITE: 'White',
};

export const vaccineDateType = {
  TEST: 'test',
  EXPIRY: 'expiry',
};

export const dateEventType = {
  SET: 'set',
  CANCEL: 'dismissed',
};

export const settingsCellIds = {
  healthResults: 0,
  tempResults: 1,
  shareHistory: 2,
  personalContactDetails: 3,
  passwordSettings: 4,
  inviteFriends: 5,
  myCompany: 6,
  aboutVersion: 7,
  termsConditions: 8,
  privacyPolicy: 9,
  logout: 10,
  deleteUser: 11,
  jumioVerfication: 12,
  vaccinationResults: 13,
  medicalApprover: 14,
};

export const cameraOptions = {
  takePic: 0,
  fromLibrary: 1,
  cancel: 2,
};

export const InvitationStatuses = {
  viewed: 8,
  deliveryIssue: 'deliveryIssue',
  invitationDelivered: 'invitationDelivered',
  emailReadByUser: 'emailReadByUser',
  userHasApp: 'userHasApp',
  invitationViewed: 'invitationViewed',
};
export const HealthTestPopupTypes = {
  approve: 1,
  reject: 2,
};
export const RejectionTypes = {
  illegibleDocument: 'Document illegible',
  incorrectData: 'Incorrect data',
  other: 'Other issue',
};
export const vaccineVerifyType = {
  accept: 'Accept',
  reject: 'Reject',
};
export const MedicalApproverLocationIds = {
  unitedKingdom: 1,
  unitedStates: 2,
  other: 3,
};

export const jumioSource = {
  medicalApprover: 'medicalApprover',
  settings: 'settings',
};
export const medicalApproverSteps = {
  jumioValidationNeeded: 0,
  waitForJumioValidation: 1,
  triggerMedicalApprovalRequest: 2,
  chooseLocation: 3,
  addMedicalApproverMedicalIdData: 4,
};
export const medicalApproverCountry = {
  UK: 'United Kingdom',
  USA: 'United State',
};

export const otherVaccineTypeKey = 'Other';
