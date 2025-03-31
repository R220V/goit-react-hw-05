import { Link } from "react-router";


export default function NotFoundPage(){
	return(
	<div>
		<h3>Page not Found. Follow this {' '}
			<Link to= "/moviespage">link</Link>
		</h3>

	</div>
	)
}