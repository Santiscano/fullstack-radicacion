import { setEmployee, setRemoveEmployee, type Employee } from "../Redux-reducer/employeesSlice";
import { useAppDispatch } from "../hooks/useStore";

export const useEmployee = () => {
  const dispatch = useAppDispatch();

  const addEmployee = (employee: Employee) => {
    dispatch(setEmployee(employee))
  };
  const removeEmployee = () => {
    dispatch(setRemoveEmployee());
  };

  // ---------------User----------------//
  const setSedesName = (sedes_name: string) => {
    dispatch(setEmployee({sedes_name}))
  };

  const setidentificationType = (users_identification_type: any) => {
    dispatch(setEmployee({users_identification_type}))
  };

  const setUsersIdentification = (users_identification: string) => {
    dispatch(setEmployee({users_identification}))
  };
  const setUsersName = (users_name:string) => {
    dispatch(setEmployee({users_name}))
  };
  const setUsersLastName = (users_lastname:string) => {
    dispatch(setEmployee({users_lastname}))
  };
  const setUsersAddress = (users_address:string) => {
    dispatch(setEmployee({users_address}))
  };
  const setUsersPhone = (users_phone:string) => {
    dispatch(setEmployee({users_phone}))
  };
  const setUsersEmail = (users_email:string) => {
    dispatch(setEmployee({users_email}))
  };

  // --------------personal information--------//
  const setCompensationFund = (compensation_fund:string) => {
    dispatch(setEmployee({compensation_fund}))
  };
  const setPension = (pension:string) => {
    dispatch(setEmployee({pension}))
  };
  const setLayoffs = (layoffs:string) => {
    dispatch(setEmployee({layoffs}))
  };
  const setEps = (eps:string) => {
    dispatch(setEmployee({eps}))
  };
  const setArl = (arl:string) => {
    dispatch(setEmployee({arl}))
  };
  const setMedicalEmergency = (medical_emergency:string) => {
    dispatch(setEmployee({medical_emergency}))
  };
  const setArlEmergency = (arl_emergency:string) => {
    dispatch(setEmployee({arl_emergency}))
  };
  const setRh = (rh:string) => {
    dispatch(setEmployee({rh}))
  };
  const setAcademicLevel = (academic_level:string) => {
    dispatch(setEmployee({academic_level}))
  };
  const setBirthdate = (birthdate:string) => {
    dispatch(setEmployee({birthdate}))
  };
  const setGender = (gender:string) => {
    dispatch(setEmployee({gender}))
  };
  const setCivilStatus = (civil_status:string) => {
    dispatch(setEmployee({civil_status}))
  };
  const setCity = (city:string) => {
    dispatch(setEmployee({city}))
  };
  const setShirtSize = (shirt_size:string) => {
    dispatch(setEmployee({shirt_size}))
  };
  const setPantSize = (pant_size:string) => {
    dispatch(setEmployee({pant_size}))
  };
  const setShoeSize = (shoe_size:string) => {
    dispatch(setEmployee({shoe_size}))
  };
  const setPhotoPath = (photo_path:string) => {
    dispatch(setEmployee({photo_path}))
  };
  // --------------hiring---------------------//
  const setTypeContratationName = (type_contratation_name:string) => {
    dispatch(setEmployee({type_contratation_name}))
  };
  const setPositionName = (position_name:string) => {
    dispatch(setEmployee({position_name}))
  };
  const setCompanyName = (company_name:string) => {
    dispatch(setEmployee({company_name}))
  };
  const setCompanyAddress = (company_address:string) => {
    dispatch(setEmployee({company_address}))
  };
  const setCompanyPhone = (company_phone:number) => {
    dispatch(setEmployee({company_phone}))
  };
  const setHiringEntryDate = (hiring_entry_Date:string) => {
    dispatch(setEmployee({hiring_entry_Date}))
  };
  const setHiringDepartureDate = (hiring_departure_date:string) => {
    dispatch(setEmployee({hiring_departure_date}))
  };
  const setHiringSalary = (hiring_salary:number) => {
    dispatch(setEmployee({hiring_salary}))
  };
  const setHiringCostCenter = (hiring_cost_center:string) => {
    dispatch(setEmployee({hiring_cost_center}))
  };
  const setPersonaleInformationViculationDate = (personale_information_viculation_date:string) => {
    dispatch(setEmployee({personale_information_viculation_date}))
  };
  // --------------emergency contact----------//
  const setEmergencyContactName = (emergency_contact_name:string) => {
    dispatch(setEmployee({emergency_contact_name}))
  };
  const setEmergencyContactLastname = (emergency_contact_lastname:string) => {
    dispatch(setEmployee({emergency_contact_lastname}))
  };
  const setEmergencyContactRelationship = (emergency_contact_relationship:string) => {
    dispatch(setEmployee({emergency_contact_relationship}))
  };
  const setEmergencyContactPhone = (emergency_contact_phone:number) => {
    dispatch(setEmployee({emergency_contact_phone}))
  };
  const setEmergencyContactCellPhone = (emergency_contact_cell_phone:number) => {
    dispatch(setEmployee({emergency_contact_cell_phone}))
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
    setUsersEmail,
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
    setEmergencyContactCellPhone
  };
};
