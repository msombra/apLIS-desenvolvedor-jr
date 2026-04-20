import { Pencil, Trash2 } from 'lucide-react';

const DataTable = ({ children, header }) => {

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              {header.map((item, idx) => (
                <th key={idx}>{item}</th>
              ))}
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;