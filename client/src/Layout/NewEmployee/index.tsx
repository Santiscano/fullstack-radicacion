import { useState } from "react";
import TestAutocomplete from "../../components/common/SearchDobleDepCity";

function NewEmployee() {
  const [documentType, setDocumentType] = useState("");
  const [user, setUser] = useState("");

  return (
    <TestAutocomplete
      department={documentType}
      setDepartment={setDocumentType}
      city={user}
      setCity={setUser}
    />
  );
}

export default NewEmployee;
