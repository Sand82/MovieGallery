import { useState } from "react";

import Tag from "./Tag/Tag.jsx"
import Error from "../Error/Error.jsx";
import styles from "./Tags.module.css"

const Tags = ({tagHandler, defaultValue}) => {
	
	const [tagList, setTagList] = useState(defaultValue);
	const [tag, setTag] = useState("");
	const [error, setError] = useState(false);	

	const createTagHandler = (e) => {
		e.preventDefault();		

		if (tag && !tagList.includes(tag)) {
			setTagList([...tagList, tag]);
			setTag("");			
			setError(false);
			tagHandler([...tagList, tag]);			
		} else {
			setError(true);
		}		
	};

	const changeTagHandler = (e) => {
		e.preventDefault();
		setTag(e.target.value);
	};

	const errorHandler = () => {
		if (tagList.includes(tag)) {
			setError(true);
		} else {
			setError(false);
		}
	};

	const tagRemoveHandler = (value) => {
		setTagList(state => state.filter(t => t !== value))
		tagHandler(tagList.filter(t => t !== value));
	}

	return (	
	<div className={`container ${styles["tags-container"]}`}>
		<h2 className={styles["tags-title"]}>Tag section</h2>
		<div className="row">
			<div className="col-4">
				<label className="form-label" htmlFor="tag">Tag</label>
				<input
					className="form-control"
					type="text"
					name="tag"
					value={tag}
					onChange={changeTagHandler}
					onBlur={errorHandler}
				/>
				<div>
					{error && <Error error="Tag should be a unique value." />}
				</div>

				<button className="btn btn-secondary mt-4" disabled={error} onClick={createTagHandler}>
				Create Tag
			</button>			
			</div>

			<div className="col-8 mt-4">
				{tagList.map((t) => (
					<Tag key={t} value={t} tagRemoveHandler={tagRemoveHandler} />
				))}
			</div>
		</div>	
	</div>
	);
};

export default Tags;
