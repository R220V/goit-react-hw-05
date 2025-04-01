import { useState } from "react";
import css from "./SearchM.module.css";

export default function SearchM({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
	setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
	event.preventDefault();
	onSubmit(query);
  };

  return (
	<form onSubmit={handleSubmit} className={css.form}>
	  <input
		className={css.input}
		type="text"
		name="query"
		value={query}
		onChange={handleChange}
		autoComplete="off"
		autoFocus
		placeholder="Search movies"
	  />
	  <button className={css.btn} type="submit">
		Search
	  </button>
	</form>
  );
}