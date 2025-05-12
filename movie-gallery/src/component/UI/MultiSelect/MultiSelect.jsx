import Select from 'react-select';
import Error from '../Error/Error.jsx';

const MultiSelect = ({ label, options, selectedOptions, error, changeHandler }) => {
  
  return (
    <div className="container mt-4">
      <h5>{label}</h5>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={changeHandler}
        placeholder="Search and select..."
        className={error ? 'is-invalid' : ''}
      />
      {error && <Error error={error} />}
    </div>
  );
};

export default MultiSelect;