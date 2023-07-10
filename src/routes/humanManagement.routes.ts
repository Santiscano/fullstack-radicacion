import { Router } from 'express';
import { getCompanys, getByIdCompanys, postCompanys, putCompanys, deleteCompanys } from '../controllers/GH/companys.controller';
import { getDocumentsType, getByIdDocumentsType, postDocumentsType, putDocumentsType, deleteDocumentsType } from '../controllers/GH/documents_type.controller';
import { getDocuments, getByIdDocuments, postDocuments, putDocuments, deleteDocuments } from '../controllers/GH/documents.controller';
import { getEmergencyContact, getByIdEmergencyContact, postEmergencyContact, putEmergencyContact, deleteEmergencyContact } from '../controllers/GH/emergency_contact.controller';
import { getEmployees, getByIdEmployees, postEmployees, putEmployees, deleteEmployees } from '../controllers/GH/employees.controller';
import { employeeFilter } from '../controllers/GH/filter.controller';
import { getFoldersDocumentsType, getByIdFoldersDocumentsType, postFoldersDocumentsType, putFoldersDocumentsType, deleteFoldersDocumentsType } from '../controllers/GH/folders_documents_type.controller';
import { getFolders, getByIdFolders, postFolders, putFolders, deleteFolders } from '../controllers/GH/folders.controller';
import { getHiring, getByIdHiring, postHiring, putHiring, deleteHiring } from '../controllers/GH/hiring.controller';
import { getPersonalInformation, getByIdPersonalInformation ,postPersonalInformation, putPersonalInformation, deletePersonalInformation } from '../controllers/GH/personal_information.controller';
import { getPositionCompany, getByIdPositionCompany, postPositionCompany, putPositionCompany, deletePositionCompany } from '../controllers/GH/position_company.controller';
import { getUsersFolders, getByIdUsersFolders, postUsersFolders, putUsersFolders, deleteUsersFolders } from '../controllers/GH/users_folders.controller';

// MIDDLEWARES
import { decodeToken } from '../middleware/manage.token';
import { validateApikey } from '../middleware/manage.apikey';

const humanManagement = Router();

// COMPANYS
humanManagement.get("/getCompanys", getCompanys);
humanManagement.get("/getCompanyById/:id", getByIdCompanys);
humanManagement.post("/postCompany",postCompanys);
humanManagement.put("/putCompany",putCompanys);
humanManagement.delete("/deleteCompany/:id",deleteCompanys);
// DOCUMENTS_TYPE
humanManagement.get("/getDocumentsType", getDocumentsType);
humanManagement.get("/getDocumentTypeById/:id", getByIdDocumentsType);
humanManagement.post("/postDocumentType", postDocumentsType);
humanManagement.put("/putDocumentType", putDocumentsType);
humanManagement.delete("/deleteDocumentType/:id", deleteDocumentsType);
// DOCUMENTS
humanManagement.get("/getDocuments", getDocuments);
humanManagement.get("/getDocumentById/:id", getByIdDocuments);
humanManagement.post("/postDocument", postDocuments);
humanManagement.put("/putDocument", putDocuments);
humanManagement.delete("/deleteDocument/:id", deleteDocuments);
// EMERGENCY_CONTACT
humanManagement.get("/getEmergencyContacts", getEmergencyContact);
humanManagement.get("/getEmergencyContactById/:id", getByIdEmergencyContact);
humanManagement.post("/postEmergencyContact", postEmergencyContact);
humanManagement.put("/putEmergencyContact", putEmergencyContact);
humanManagement.delete("/deleteEmergencyContact/:id", deleteEmergencyContact);
// EMPLOYEES
humanManagement.get("/getEmployees", getEmployees);
humanManagement.get("/getEmployeeById/:id", getByIdEmployees );
humanManagement.post("/postEmployee", postEmployees);
humanManagement.put("/putEmployee", putEmployees);
humanManagement.delete("/deleteEmployee/:id", deleteEmployees);
// FILTER --
humanManagement.post("/employeeFilter", employeeFilter);
// FOLDERS_DOCUMENTS_TYPE
humanManagement.get("/getFoldersDocumentsType", getFoldersDocumentsType);
humanManagement.get("/getFolderDocumentTypeById/:id", getByIdFoldersDocumentsType);
humanManagement.post("/postFolderDocumentType", postFoldersDocumentsType);
humanManagement.put("/putFolderDocumentType", putFoldersDocumentsType);
humanManagement.delete("/deleteFolderDocumentType/:id", deleteFoldersDocumentsType);
// FOLDERS
humanManagement.get("/getFolders", getFolders);
humanManagement.get("/getFolderById/:id", getByIdFolders);
humanManagement.post("/postFolder", postFolders);
humanManagement.put("/putFolder", putFolders);
humanManagement.delete("/deleteFolder/:id", deleteFolders);
// HIRING
humanManagement.get("/getHirings", getHiring);
humanManagement.get("/getHiringById/:id", getByIdHiring);
humanManagement.post("/postHiring", postHiring);
humanManagement.put("/putHiring", putHiring);
humanManagement.delete("/deleteHiring/:id", deleteHiring);
// PERSONAL_INFORMATION --
humanManagement.get('/getPersonalInformation', getPersonalInformation);                   // TRAER TODA LA INFORMACIÓN PERSONAL
humanManagement.get('/getPersonalInformationById/:id', getByIdPersonalInformation);                   // TRAER TODA LA INFORMACIÓN PERSONAL
humanManagement.post('/postPersonalInformation/', postPersonalInformation);                // CREAR LA INFORMACIÓN PERSONAL SEGÚN UN USUARIO
humanManagement.put('/putPersonalInformation', putPersonalInformation);                   // EDITAR LA INFORMACIÓN PERSONAL SEGÚN UN USUARIO
humanManagement.delete('/deletePersonalInformation/:id', deletePersonalInformation);            // ELIMINAR LA INFORMACIÓN PERSONAL DE UN USUARIO
// POSITION_COMPANY --
humanManagement.get("/getPositions", getPositionCompany);
humanManagement.get("/getPositionById/:id", getByIdPositionCompany);
humanManagement.post("/postPosition", postPositionCompany);
humanManagement.put("/putPosition", putPositionCompany);
humanManagement.delete("/deletePosition/:id", deletePositionCompany);
// USERS_FOLDERS
humanManagement.get("/getUsersFolders", getUsersFolders);
humanManagement.get("/getUserFolderById/:id", getByIdUsersFolders);
humanManagement.post("/postUserFolder", postUsersFolders);
humanManagement.put("/putUserFolder", putUsersFolders);
humanManagement.delete("/deleteUserFolder/:id", deleteUsersFolders);

export default humanManagement;