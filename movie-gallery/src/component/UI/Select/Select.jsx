import styles from "./Select.module.css";

const Select = ({itemsPerPageHandler}) => {

	const selectChangeHandler = (e) => {
		itemsPerPageHandler(e.target.value)
	}

  return (
    <select                    
      name="pagination"
      className={`form-select list-group-item text-dark ${styles["pagination-select"]}`}            
      onChange={selectChangeHandler}                                      
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="30">30</option>
    </select>
  )
}

export default Select;