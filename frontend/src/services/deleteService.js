// Função reutilizável para deletar itens
export const handleDelete = async (id, tipo, nomeItem, setItems, setLoading) => {
  // 1. Confirmar antes de deletar
  if (!window.confirm(`Tem certeza que deseja deletar "${nomeItem}"?`)) {
    return false;
  }

  // 2. Mostrar loading
  if (setLoading) setLoading(true);

  try {
    // 3. Fazer DELETE para API
    const response = await fetch(`https://backend-y6kz.onrender.com/api/${tipo}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (response.ok) {
      // 4. Atualizar estado removendo o item
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      
      // 5. Mostrar sucesso
      alert(`${nomeItem} deletado com sucesso!`);
      return true;
    } else {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    // 6. Tratar erros
    console.error('Erro ao deletar:', error);
    alert(`Erro ao deletar ${nomeItem}: ${error.message}`);
    return false;
  } finally {
    // 7. Remover loading
    if (setLoading) setLoading(false);
  }
};