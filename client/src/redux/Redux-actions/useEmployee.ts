import { ChangeEvent } from "react";
import {
  setEmployee,
  setRemoveEmployee,
  type Employee,
} from "../Redux-reducer/employeesSlice";
import { useAppDispatch } from "../hooks/useStore";

export const useEmployee = () => {
  const dispatch = useAppDispatch();

  const addEmployee = (employee: Employee) => {
    dispatch(setEmployee(employee));
  };
  const removeEmployee = () => {
    dispatch(setRemoveEmployee());
  };

  // ---------------User----------------//
  const setSedesName = (sedes_name: string) => {
    dispatch(setEmployee({ sedes_name }));
  };

  const setidentificationType = (users_identification_type: any) => {
    dispatch(setEmployee({ users_identification_type }));
  };

  const setUsersIdentification = (users_identification: string) => {
    dispatch(setEmployee({ users_identification }));
  };
  const setUsersName = (users_name: string) => {
    dispatch(setEmployee({ users_name }));
  };
  const setUsersLastName = (users_lastname: string) => {
    dispatch(setEmployee({ users_lastname }));
  };
  const setUsersAddress = (users_address: string) => {
    dispatch(setEmployee({ users_address }));
  };
  const setUsersPhone = (users_phone: string) => {
    dispatch(setEmployee({ users_phone }));
  };
  const setUsersCellphone = (users_cellphone: string) => {
    dispatch(setEmployee({ users_cellphone }));
  };
  const setUsersEmail = (users_email: string) => {
    dispatch(setEmployee({ users_email }));
  };
  const setUsersStatus = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ users_status: event.target.value }));
  };

  // --------------personal information--------//
  const setCompensationFund = (compensation_fund: string) => {
    dispatch(setEmployee({ compensation_fund }));
  };
  const setPension = (pension: string) => {
    dispatch(setEmployee({ pension }));
  };
  const setLayoffs = (layoffs: string) => {
    dispatch(setEmployee({ layoffs }));
  };
  const setEps = (eps: string) => {
    dispatch(setEmployee({ eps }));
  };
  const setArl = (arl: string) => {
    dispatch(setEmployee({ arl }));
  };
  const setMedicalEmergency = (medical_emergency: string) => {
    dispatch(setEmployee({ medical_emergency }));
  };
  const setArlEmergency = (arl_emergency: string) => {
    dispatch(setEmployee({ arl_emergency }));
  };
  const setRh = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ rh: event.target.value }));
  };
  const setAcademicLevel = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ academic_level: event.target.value }));
  };
  const setBirthdate = (birthdate: string) => {
    dispatch(setEmployee({ birthdate }));
  };
  const setGender = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ gender: event.target.value }));
  };
  const setCivilStatus = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ civil_status: event.target.value }));
  };
  const setCity = (city: string) => {
    dispatch(setEmployee({ city }));
  };
  const setShirtSize = (shirt_size: string) => {
    dispatch(setEmployee({ shirt_size }));
  };
  const setPantSize = (pant_size: string) => {
    dispatch(setEmployee({ pant_size }));
  };
  const setShoeSize = (shoe_size: string) => {
    dispatch(setEmployee({ shoe_size }));
  };
  const setPhotoPath = (photo_path: string) => {
    dispatch(setEmployee({ photo_path }));
  };
  // --------------hiring---------------------//
  const setTypeContratationName = (type_contratation_name: string) => {
    dispatch(setEmployee({ type_contratation_name }));
  };
  const setPositionName = (position_name: string) => {
    dispatch(setEmployee({ position_name }));
  };
  const setCompanyName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ company_name: event.target.value }));
  };
  const setCompanyAddress = (company_address: string) => {
    dispatch(setEmployee({ company_address }));
  };
  const setCompanyPhone = (company_phone: number) => {
    dispatch(setEmployee({ company_phone }));
  };
  const setPersonaleInformationViculationDate = (personale_information_viculation_date: string) => {
    dispatch(setEmployee({ personale_information_viculation_date }));
  };
  const setHiringEntryDate = (hiring_entry_Date: string) => {
    dispatch(setEmployee({ hiring_entry_Date }));
  };
  const setHiringDepartureDate = (hiring_departure_date: string) => {
    dispatch(setEmployee({ hiring_departure_date }));
  };
  const setHiringSalary = (hiring_salary: number) => {
    dispatch(setEmployee({ hiring_salary }));
  };
  const setHiringCostCenter = (hiring_cost_center: string) => {
    dispatch(setEmployee({ hiring_cost_center }));
  };
  // --------------emergency contact----------//
  const setEmergencyContactName = (emergency_contact_name: string) => {
    dispatch(setEmployee({ emergency_contact_name }));
  };
  const setEmergencyContactLastname = (emergency_contact_lastname: string) => {
    dispatch(setEmployee({ emergency_contact_lastname }));
  };
  const setEmergencyContactRelationship = (
    emergency_contact_relationship: string
  ) => {
    dispatch(setEmployee({ emergency_contact_relationship }));
  };
  const setEmergencyContactPhone = (emergency_contact_phone: number) => {
    dispatch(setEmployee({ emergency_contact_phone }));
  };
  const setEmergencyContactCellPhone = (
    emergency_contact_cell_phone: number
  ) => {
    dispatch(setEmployee({ emergency_contact_cell_phone }));
  };
  // -------------sociodemographicProfile-----------//
  const setProfilePlaceBirth = (profile_place_birth: string) => {
    dispatch(setEmployee({ profile_place_birth }));
  };
  const setProfileTransportationHelp = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setEmployee({ profile_transportation_help: event.target.value }));
  };
  const setProfileConnectivityHelp = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_connectivity_help: event.target.value }));
  };
  const setProfileOthersContractsCompany = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_others_contracts_company: event.target.value }));
  };
  const setProfileWorkingModality = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_working_modality: event.target.value }));
  };
  const setProfileTitleAcademicTraining = (profile_title_academic_training: string) => {
    dispatch(setEmployee({ profile_title_academic_training }));
  };
  const setProfileHomeTenure = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_home_tenure: event.target.value }));
  };
  const setProfileTypeTransport = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_type_transport: event.target.value }));
  };
  const setProfileHeadFamily = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_head_family: event.target.value }));
  };
  const setProfileNumberChildren = (profile_number_children: number) => {
    dispatch(setEmployee({ profile_number_children }));
  };
  const setProfileDependents = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_dependents: event.target.value }));
  };
  const setProfileDependentsDisabilities = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_dependents_disabilities: event.target.value }));
  };
  const setProfileMonthlyFamilyIncome = (profile_monthly_family_income: number) => {
    dispatch(setEmployee({ profile_monthly_family_income }));
  };
  const setProfileIncomeEnough = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_income_enough: event.target.value }));
  };
  const setProfilePublicServicesStratum = (profile_public_services_stratum: number) => {
    dispatch(setEmployee({ profile_public_services_stratum }));
  };
  const setProfileElectricPower = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_electric_power: event.target.value }));
  };
  const setProfileSewerage = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_sewerage: event.target.value }));
  };
  const setProfileAqueduct = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_aqueduct: event.target.value }));
  };
  const setProfileNaturalGasNetwork = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_natural_gas_network: event.target.value }));
  };
  const setProfileGarbageColletion = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_garbage_colletion: event.target.value }));
  };
  const setProfileLandline = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_landline: event.target.value }));
  };
  const setProfileComputerHome = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_computer_home: event.target.value }));
  };
  const setProfileInternetHome = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_internet_home: event.target.value }));
  };
  const setProfileAlcoholConsumption = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_alcohol_consumption: event.target.value }));
  };
  const setProfileSmoke = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_smoke: event.target.value }));
  };
  const setProfileFormerSmoke = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_former_smoke: event.target.value }));
  };
  const setProfilePlaySport = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_play_sport: event.target.value }));
  };
  const setProfileSportFrequency = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_sport_frequency: event.target.value }));
  };
  const setProfileChronicDisease = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_chronic_disease: event.target.value }));
  };
  const setProfileWhatCrhonicDisease = (profile_what_crhonic_disease: string) => {
    dispatch(setEmployee({ profile_what_crhonic_disease }));
  };
  const setProfileTakeMedication = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_take_medication: event.target.value }));
  };
  const setProfileWhatMedicationTake = (profile_what_medication_take: string) => {
    dispatch(setEmployee({ profile_what_medication_take }));
  };
  const setProfileAllergic = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ profile_allergic: event.target.value }));
  };
  const setProfileWhatAllergic = (profile_what_allergic: string) => {
    dispatch(setEmployee({ profile_what_allergic }));
  };
  // -------------------------------------------------------------------------------//
  const setCvName = (cv_document: string) => {
    dispatch(setEmployee({ cv_document }));
  };
  const setdiName = (document_type_document: string) => {
    dispatch(setEmployee({ document_type_document }));
  };
  const setLcName = (driveing_license_document: string) => {
    dispatch(setEmployee({ driveing_license_document }));
  };
  const setLmName = (military_card_document: string) => {
    dispatch(setEmployee({ military_card_document }));
  };
  const setDvName = (vehicle_documents: string) => {
    dispatch(setEmployee({ vehicle_documents }));
  };
  const setDnpvName = (notary_document: string) => {
    dispatch(setEmployee({ notary_document }));
  };
  const setDbName = (bachelor_document: string) => {
    dispatch(setEmployee({ bachelor_document }));
  };
  const setTName = (technique_document: string) => {
    dispatch(setEmployee({ technique_document }));
  };
  const setTecName = (technology_document: string) => {
    dispatch(setEmployee({ technology_document }));
  };
  const setProfName = (professional_document: string) => {
    dispatch(setEmployee({ professional_document }));
  };
  const setPosgName = (postgraduate_document: string) => {
    dispatch(setEmployee({ postgraduate_document }));
  };
  const setCbName = (bank_certificate_document: string) => {
    dispatch(setEmployee({ bank_certificate_document }));
  };
  const setRpName = (personal_reference_document: string) => {
    dispatch(setEmployee({ personal_reference_document }));
  };
  const setRaName = (academic_reference_document: string) => {
    dispatch(setEmployee({ academic_reference_document }));
  };
  const setRlName = (work_reference_document: string) => {
    dispatch(setEmployee({ work_reference_document }));
  };
  const setVrlName = (employment_work_reference: string) => {
    dispatch(setEmployee({ employment_work_reference }));
  };
  const setVrpName = (employment_personal_reference: string) => {
    dispatch(setEmployee({ employment_personal_reference }));
  };
  const setVraName = (employment_academic_reference: string) => {
    dispatch(setEmployee({ employment_academic_reference }));
  };
  // --------------------------hiring---------------------//
  const setWorkContract = (work_contract: string) => {
    dispatch(setEmployee({ work_contract }));
  };
  const setAnotherIf = (another_if: string) => {
    dispatch(setEmployee({ another_if }));
  };
  const setConfidentialityAgreement = (confidentiality_agreement: string) => {
    dispatch(setEmployee({ confidentiality_agreement }));
  };
  const seAuthOwnerInformation = (auth_owner_information: string) => {
    dispatch(setEmployee({ auth_owner_information }));
  };
  const setSinplaftQuery = (siplaft_query: string) => {
    dispatch(setEmployee({ siplaft_query }));
  };
  const setJobDescription = (job_description: string) => {
    dispatch(setEmployee({ job_description }));
  };
  const setInduction = (induction: string) => {
    dispatch(setEmployee({ induction }));
  };
  const seApprentiteCoverLetter = (apprentice_cover_letter: string) => {
    dispatch(setEmployee({ apprentice_cover_letter }));
  };
  const setHumanManagementConcept = (human_management_concept: string) => {
    dispatch(setEmployee({ human_management_concept }));
  };
  const setHomeVisit = (home_visit: string) => {
    dispatch(setEmployee({ home_visit }));
  };
  const setFingerprintRegistration = (fingerprint_registration: string) => {
    dispatch(setEmployee({ fingerprint_registration }));
  };
  // --------------------------health safety at work------//
  const setMedicalExaminationAdmission = (medical_examination_admission: string) => {
    dispatch(setEmployee({medical_examination_admission}));
  };
  const setPeriodicMedicalExamination = (periodic_medical_examination: string) => {
    dispatch(setEmployee({periodic_medical_examination}));
  };
  const setDisabilities = (disabilities: string) => {
    dispatch(setEmployee({disabilities}));
  };
  const setPermitRequest = (permit_request: string) => {
    dispatch(setEmployee({permit_request}));
  };
  const setEndowment = (endowment: string) => {
    dispatch(setEmployee({endowment}));
  };
  const setPerformanceEvaluation = (performance_evaluation: string) => {
    dispatch(setEmployee({performance_evaluation}));
  };
  const setDeliveryWorkTools = (delivery_work_tools: string) => {
    dispatch(setEmployee({delivery_work_tools}));
  };
  // --------------------------beneficiary----------------//
  const setMarriageCertificate = (marriage_certificate:string) => {
    dispatch(setEmployee({marriage_certificate}))
  };
  const setBeneficiaryIdentityCard = (beneficiary_identity_card:string) => {
    dispatch(setEmployee({beneficiary_identity_card}))
  };
  const setChildrensCivilRegistry = ( childrens_civil_registry:string) => {
    dispatch(setEmployee({childrens_civil_registry}))
  };
  const setChildrensIdentityCard = ( childrens_identity_card:string) => {
    dispatch(setEmployee({childrens_identity_card}))
  };
  const setChildrensStudyCertificate = ( childrens_study_certificate:string) => {
    dispatch(setEmployee({childrens_study_certificate}))
  };
  // --------------------------membership-----------------//
  const setSocialSecurityPayment = ( social_security_payment:string) => {
    dispatch(setEmployee({social_security_payment}))
  };
  const setEpsCertificate = (eps_certificate:string) => {
    dispatch(setEmployee({eps_certificate}))
  };
  const setEpsAffiliationCertificate = ( eps_affiliation_certificate:string) => {
    dispatch(setEmployee({eps_affiliation_certificate}))
  };
  const setFpCertificate = ( fp_certificate:string) => {
    dispatch(setEmployee({fp_certificate}))
  };
  const setAffiliationCertificateCompensationBox = ( affiliation_certificate_compensation_box:string) => {
    dispatch(setEmployee({affiliation_certificate_compensation_box}))
  };
  const setLayyoffsCertificate = ( layyoffs_certificate:string) => {
    dispatch(setEmployee({layyoffs_certificate}))
  };
  const setArlAffiliationCertificate = (arl_affiliation_certificate:string) => {
    dispatch(setEmployee({arl_affiliation_certificate}))
  };
  // --------------------------social benefit-------------//
  const setPremiumServices = (premium_services:string) => {
    dispatch(setEmployee({premium_services}))
  };
  const setVacation = ( vacation:string) => {
    dispatch(setEmployee({vacation}))
  };
  const setSeveranceWithdrawalRequest = ( severance_withdrawal_request:string) => {
    dispatch(setEmployee({severance_withdrawal_request}))
  };
  const setProofOfSeverancePay = ( proof_of_severance_pay:string) => {
    dispatch(setEmployee({proof_of_severance_pay}))
  };
  // --------------------------withdrawal-----------------//
  const setLetterOfResignation = ( letter_of_resignation:string) => {
    dispatch(setEmployee({letter_of_resignation}))
  };
  const setLetterOfAcceptance = ( letter_of_acceptance:string) => {
    dispatch(setEmployee({letter_of_acceptance}))
  };
  const setContractTermination = ( contract_termination:string) => {
    dispatch(setEmployee({contract_termination}))
  };
  const setLetterWithdrawalMedicalExamination = ( letter_withdrawal_medical_examination:string) => {
    dispatch(setEmployee({letter_withdrawal_medical_examination}))
  };
  const setWithdrawalMedicalExamination = ( withdrawal_medical_examination:string) => {
    dispatch(setEmployee({withdrawal_medical_examination}))
  };
  const setFinalSettlement = ( final_settlement:string) => {
    dispatch(setEmployee({final_settlement}))
  };
  const setEpsWithdrawal = ( eps_withdrawal:string) => {
    dispatch(setEmployee({eps_withdrawal}))
  };
  const setLayoffsWithdrawal = ( layoffs_withdrawal:string) => {
    dispatch(setEmployee({layoffs_withdrawal}))
  };
  const setArlWithdrawal = ( arl_withdrawal:string) => {
    dispatch(setEmployee({arl_withdrawal}))
  };
  const setCompensationBoxWithdrawal = ( compensation_box_withdrawal:string) => {
    dispatch(setEmployee({compensation_box_withdrawal}))
  };
  const setDeliveryWorkTool = ( delivery_work_tool:string) => {
    dispatch(setEmployee({delivery_work_tool}))
  };
  // --------------------------deductions-----------------//
  const setDp = ( dp:string) => {
    dispatch(setEmployee({dp}))
  };
  const setOrder = ( order:string) => {
    dispatch(setEmployee({order}))
  };
  const setPayrollDeductionAuthorizationEvents = ( payroll_deduction_authorization_events:string) => {
    dispatch(setEmployee({payroll_deduction_authorization_events}))
  };

  return {
    addEmployee,
    removeEmployee,
    // user
    setSedesName,
    setidentificationType,
    setUsersIdentification,
    setUsersName,
    setUsersLastName,
    setUsersAddress,
    setUsersPhone,
    setUsersCellphone,
    setUsersEmail,
    setUsersStatus,
    // personal information
    setCompensationFund,
    setPension,
    setLayoffs,
    setEps,
    setArl,
    setMedicalEmergency,
    setArlEmergency,
    setRh,
    setAcademicLevel,
    setBirthdate,
    setGender,
    setCivilStatus,
    setCity,
    setShirtSize,
    setPantSize,
    setShoeSize,
    setPhotoPath,
    // hiring
    setTypeContratationName,
    setPositionName,
    setCompanyName,
    setCompanyAddress,
    setCompanyPhone,
    setHiringEntryDate,
    setHiringDepartureDate,
    setHiringSalary,
    setHiringCostCenter,
    setPersonaleInformationViculationDate,
    // emergency
    setEmergencyContactName,
    setEmergencyContactLastname,
    setEmergencyContactRelationship,
    setEmergencyContactPhone,
    setEmergencyContactCellPhone,
    // sociodemographicProfile
    setProfilePlaceBirth,
    setProfileTransportationHelp,
    setProfileConnectivityHelp,
    setProfileOthersContractsCompany,
    setProfileWorkingModality,
    setProfileTitleAcademicTraining,
    setProfileHomeTenure,
    setProfileTypeTransport,
    setProfileHeadFamily,
    setProfileNumberChildren,
    setProfileDependents,
    setProfileDependentsDisabilities,
    setProfileMonthlyFamilyIncome,
    setProfileIncomeEnough,
    setProfilePublicServicesStratum,
    setProfileElectricPower,
    setProfileSewerage,
    setProfileAqueduct,
    setProfileNaturalGasNetwork,
    setProfileGarbageColletion,
    setProfileLandline,
    setProfileComputerHome,
    setProfileInternetHome,
    setProfileAlcoholConsumption,
    setProfileSmoke,
    setProfileFormerSmoke,
    setProfilePlaySport,
    setProfileSportFrequency,
    setProfileChronicDisease,
    setProfileWhatCrhonicDisease,
    setProfileTakeMedication,
    setProfileWhatMedicationTake,
    setProfileAllergic,
    setProfileWhatAllergic,
    // file link
    setCvName,
    setdiName,
    setLcName,
    setLmName,
    setDvName,
    setDnpvName,
    setDbName,
    setTName,
    setTecName,
    setProfName,
    setPosgName,
    setCbName,
    setRpName,
    setRaName,
    setRlName,
    setVrlName,
    setVrpName,
    setVraName,
    // hiring
    setWorkContract,
    setAnotherIf,
    setConfidentialityAgreement,
    seAuthOwnerInformation,
    setSinplaftQuery,
    setJobDescription,
    setInduction,
    seApprentiteCoverLetter,
    setHumanManagementConcept,
    setHomeVisit,
    setFingerprintRegistration,
    // health safety at work
    setMedicalExaminationAdmission,
    setPeriodicMedicalExamination,
    setDisabilities,
    setPermitRequest,
    setEndowment,
    setPerformanceEvaluation,
    setDeliveryWorkTools,
    // beneficiary
    setMarriageCertificate,
    setBeneficiaryIdentityCard,
    setChildrensCivilRegistry,
    setChildrensIdentityCard,
    setChildrensStudyCertificate,
    // membership
    setSocialSecurityPayment,
    setEpsCertificate,
    setEpsAffiliationCertificate,
    setFpCertificate,
    setAffiliationCertificateCompensationBox,
    setLayyoffsCertificate,
    setArlAffiliationCertificate,
    // social benefit
    setPremiumServices,
    setVacation,
    setSeveranceWithdrawalRequest,
    setProofOfSeverancePay,
    // withdrawal
    setLetterOfResignation,
    setLetterOfAcceptance,
    setContractTermination,
    setLetterWithdrawalMedicalExamination,
    setWithdrawalMedicalExamination,
    setFinalSettlement,
    setEpsWithdrawal,
    setLayoffsWithdrawal,
    setArlWithdrawal,
    setCompensationBoxWithdrawal,
    setDeliveryWorkTool,
    // deductions
    setDp,
    setOrder,
    setPayrollDeductionAuthorizationEvents,
  };
};
