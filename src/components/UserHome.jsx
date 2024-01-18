import { Link } from "react-router-dom";

/**
 * @param {{children: [{link: string, icon, nom: string, disabled: boolean}]}} props 
 * @returns 
 */
export default function ({ children = [] }) {
  return (
    <>
      {children.map(
        (row) =>
          row && (
            <Link to={row.path} className="menu-block" key={row.path}>
                {row.name}
            </Link>
          )
      )}
    </>
  );
}
