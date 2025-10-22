import React, { useState } from 'react';
import { handleDelete } from '../utils/deleteHandler';

const ExemploDelete = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [hortas, setHortas] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {/* Exemplo para usuários */}//
      <button 
        onClick={() => handleDelete(1, 'usuarios', 'João Silva', setUsuarios, setLoading)}
        disabled={loading}
      >
        {loading ? 'Deletando...' : 'Deletar Usuário'}
      </button>

      {/* Exemplo para hortas */}
      <button 
        onClick={() => handleDelete(2, 'hortas', 'Horta Urbana', setHortas, setLoading)}
        disabled={loading}
      >
        {loading ? 'Deletando...' : 'Deletar Horta'}
      </button>

      {/* Exemplo para colheitas */}
      <button 
        onClick={() => handleDelete(3, 'colheitas', 'Colheita de Tomates', setHortas, setLoading)}
        disabled={loading}
      >
        {loading ? 'Deletando...' : 'Deletar Colheita'}
      </button>
    </div>
  );
};

export default ExemploDelete;