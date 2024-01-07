import { Link, useSearchParams } from "react-router-dom";

const Navbar = () => {
  
  const [searchParam] = useSearchParams();
  const todosData = searchParam.get("todos");

  return (
    <nav>
      <Link to="/" className={todosData === null ? "active" : ""}>
        All
      </Link>
      <Link
        to="/?todos=Active"
        className={todosData === "Active" ? "active" : ""}
      >
        Active
      </Link>
      <Link
        to="/?todos=Completed"
        className={todosData === "Completed" ? "active" : ""}
      >
        Completed
      </Link>
    </nav>
  );
};

export default Navbar;
