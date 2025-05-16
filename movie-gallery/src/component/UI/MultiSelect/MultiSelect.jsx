import Select from 'react-select';
import Error from '../Error/Error.jsx';

import { multiSelectStyles } from "../../../services/HelperService.js"

const MultiSelect = ({ label, options, selectedOptions, error, changeHandler }) => {

  return (
    < >
      <h5>{label}</h5>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={changeHandler}
        placeholder={`Search and Select ${label}`} 
        styles={multiSelectStyles}             
      />
      {error && <Error error={error} />}
    </>
  );
};

export default MultiSelect;