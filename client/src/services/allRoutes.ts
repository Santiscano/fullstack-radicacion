const host = import.meta.env.VITE_BASE_URL;

export default {
  host: host,
  api: {
    roles: {
      get: `${host}/getRoles`,
      getName: `${host}/getRolesName`,
      notAdminProv:`${host}/getNotAdminProv`,
      provider: `${host}/getProvider`,
      create: `${host}/postRol`,
      edit: `${host}/putRol`,
      delete: `${host}/deleteRol`,
    },
    cedis: {
      get: `${host}/getSedes`,
      cedisName: `${host}/getSedesName`,
      create: `${host}/postSede`,
      edit: `${host}/putSede`,
      delete: `${host}/deleteSede`,
    },
    users: {
      validate: `${host}/getValidateUser`,
      getUsers: `${host}/getUsers`,
      getNoAdminProv: `${host}/getNoAdminProv`,
      getByRol: `${host}/getUserbyRol`,
      createUser: `${host}/postUser`,
      editUser: `${host}/putUser`,
      deleteUser: `${host}/deleteUser`,
      getDocumentTypes: `${host}/getIdentificationByType`,
      getTypeIdentification: `${host}/getTypeIdentification`,
      notAdminProv: `${host}/getUsersNotAdminProv`,
      getUsersByNextAuditor: `${host}/usersFilterToNextAuditor`,
      getAuditorsManager: `${host}/usersFilterReturnAuditor`,
    },
    stateFiles: {
      getStateFiles: `${host}/getStatesFiles`,
      getStateFilesToRole: `${host}/actionFilter`,
      addStateFile: `${host}/postStatesFile`,
      editStateFile: `${host}/putStatesFile`,
      deleteStateFile: `${host}/deleteStatesFile`,
    },
    files: {
      getFiles: `${host}/getFiles`,
      addFile: `${host}/postFile`,
      editFile: `${host}/putFile`,
      deleteFile: `${host}/deleteFile`,
    },
    filesPath: {
      getFilesPath: `${host}/getFilesPath`,
      createFilePath: `${host}/postFilePath`,
      deleteFilePath: `${host}/deleteFilePath`,
    },
    tracking: {
      getAllTrackings: `${host}/getTrackings`,
      getTrackingBySettled: `${host}/getTrackingRegistered`,
      getTrackingByDocument: `${host}/getTrackingAccountType`,
    },
    centerCost: {
      area: {
        getCostArea: `${host}/getCostArea`,
        createCostArea: `${host}/postCostArea`,
        deleteCostArea: `${host}/deleteCostArea`,
      },
      subArea: {
        getCostSubArea: `${host}/getCostSubArea`,
        getCostSubAreaById: `${host}/getCostSubAreaById`,
        createCostSubArea: `${host}/postCostSubArea`,
        deleteCostSubArea: `${host}/deleteCostSubArea`,
      },
      CenterCost: {
        getCostCenter: `${host}/getCostCenter`,
        getCostCenterById: `${host}/getCostCenterById`,
        createCostCenter: `${host}/postCostCenter`,
        deleteCostCenter: `${host}/deleteCostCenter`,
      },
      table: {
        getCostTable: `${host}/centerCostTable`,
      },
    },
    firebase: {
      createUser: `${host}/createUser`,
      login: `${host}/logIn`,
      validateUser: `${host}/validateUser`,
      changePassword: `${host}/changePassword`,
    },
    Pdf: {
      uploadfile: `${host}/uploadFileDocument`,
      getFile: `${host}/pdfFile/:radicado`,
    },
    generateSettled: `${host}/genFileRegistered`,
    routesApi: {
      getRoutes: `${host}/routerApi`,
    },
    tables: {
      allFiles: `${host}/showTable`,
      pending: `${host}/pendingTable`,
      history: `${host}/historyTable`,
    },
    searchingFile: {
      withSettled: `${host}/registeredFilter`,
      withDocument: `${host}/accountTypeFilter`,
      getAllSettled: `${host}/getAllRegisteredFile`,
      getDocumentTypes: `${host}/getIdentificationByType`,
    },
  },
  sig:{
    personalInformation: {
      getPersonalInformation: `${host}/getPersonalInformation`,
      postPersonalInformation: `${host}/postPersonalInformation`,
      putPersonalInformation: `${host}/putPersonalInformation`,
      deletePersonalInformation: `${host}/deletePersonalInformation`,
    },
  },
};
