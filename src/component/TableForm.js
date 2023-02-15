import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function TableForm() {
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAddRow = () => {
    setRows(rows + 1);
    setTableData([...tableData, Array(columns).fill('')]);
  };

  const handleRemoveRow = () => {
    if (rows > 1) {
      setRows(rows - 1);
      setTableData(tableData.slice(0, -1));
    }
  };

  const handleAddColumn = () => {
    setColumns(columns + 1);
    setTableData(tableData.map((row) => [...row, '']));
  };

  const handleRemoveColumn = () => {
    if (columns > 1) {
      setColumns(columns - 1);
      setTableData(tableData.map((row) => row.slice(0, -1)));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [rowIndex, colIndex] = name.split('-').map(Number);
    setTableData((prevData) =>
    prevData.map((row, i) =>
    i === rowIndex ? [...row.slice(0, colIndex), value, ...row.slice(colIndex + 1)] : row
    )
    );
  };

  const handleExport = () => {
    const csvData = tableData.map((row) => row.join(',')).join('\n');
    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = 'table.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  const handleSave = async () => {
    try {
      const { data } = await axios.post('https://avaxdevapi.akru.co/api/user/dummyPost', {
        tableData,
      });
      dispatch({ type: 'ADD_TABLE', payload: { id: data.id, data: tableData } });
      history.push('/tables');
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div>
      <table>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    name={`${rowIndex}-${colIndex}`}
                    value={tableData[rowIndex][colIndex]}
                    onChange={handleChange}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleRemoveRow}>Remove Row</button>
      <button onClick={handleAddColumn}>Add Column</button>
      <button onClick={handleRemoveColumn}>Remove Column</button>
      <button onClick={handleExport}>Export</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
              }
              
export default TableForm;