import { useState } from "react";

import Tag from "./Tag.jsx"
import Error from "../Error/Error.jsx";

const Tags = () => {
	const [tagList, setTagList] = useState([]);
	const [tag, setTag] = useState("");
	const [error, setError] = useState(false);

	const createTagHandler = (e) => {
		e.preventDefault();		

		if (tag && !tagList.includes(tag)) {
			setTagList([...tagList, tag]);
			setTag("");
			setError(false);
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

	return (
		
	<div className="row">		
		<div className="col-6">
			<label className="form-label" htmlFor="tag">Tag</label>
			<input
				className="form-control"
				type="text"
				name="tag"
				value={tag}
				onChange={changeTagHandler}
				onBlur={errorHandler}
			/>
			{error && <Error error="Tag should be a unique value." />}
			<button className="btn btn-secondary mt-2" disabled={error} onClick={createTagHandler}>
			Create Tag
		</button>			
		</div>
		<div className="col-6 mt-3">
			{tagList.map((t) => (
				<Tag key={t} value={t} />
			))}
		</div>
	</div>	
	
	);
};

export default Tags;
