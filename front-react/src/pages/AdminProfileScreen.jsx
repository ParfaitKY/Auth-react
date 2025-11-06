import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminProfileScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-center mt-5">
      <h2>Admin: {user?.email}</h2>
      <p>Liste des utilisateurs (exemple statique)</p>
      <ul className="list-group w-50 mx-auto">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          user@test.com
          <div>
            <button className="btn btn-sm btn-warning me-2">Modifier</button>
            <button className="btn btn-sm btn-danger">Supprimer</button>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          admin@test.com
          <div>
            <button className="btn btn-sm btn-warning me-2">Modifier</button>
            <button className="btn btn-sm btn-danger">Supprimer</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminProfileScreen;
