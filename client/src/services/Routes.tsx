const host = import.meta.env.VITE_BASE_URL;
const hostPdf = import.meta.env.VITE_URL_GET_PDF_SETTLED;

export default {
  host: host,
  hostPdf: hostPdf,
  api: {
    roles: {
      get: `${host}/getRoles`,
      create: `${host}/postRol`,
      edit: `${host}/putRol`,
      delete: `${host}/deleteRol`,
    },
    cedis: {
      get: `${host}/getSedes`,
      create: `${host}/postSede`,
      edit: `${host}/putSede`,
      delete: `${host}/deleteSede`,
    },
    users: {
      validate: `${host}/getValidateUser`,
      getUsers: `${host}/getUsers`,
      createUser: `${host}/postUser`,
      editUser: `${host}/putUser`,
      deleteUser: `${host}/deleteUser`,
      getDocumentTypes: `${host}/getIdentificationByType`,
      getTypeIdentification: `${host}/getTypeIdentification`,
    },
    stateFiles: {
      getStateFiles: `${host}/getStatesFiles`,
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
      getTrackingById: `${host}/getTracking`,
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
    },
    searchingFile: {
      withSettled: `${host}/registeredFilter`,
      withDocument: `${host}/accountTypeFilter`,
      getAllSettled: `${host}/getAllRegisteredFile`,
      getDocumentTypes: `${host}/getIdentificationByType`,
      getTypesIdentification: `${host}/getTypeIdentification`,
    },
    pdfSettledNumber: `${hostPdf}/pdf`,
  },
};
