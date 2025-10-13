export const handleDelete = async (id, tipo, nomeItem, setItems, setLoading) => {
  if (!window.confirm(`Tem certeza que deseja deletar ${nomeItem}?`)) return;

  setLoading?.(true);
  
  try {
    const response = await fetch(`http://localhost:8080/api/${tipo}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Erro ao deletar');

    setItems(prev => prev.filter(item => item.id !== id));
    alert('Item deletado com sucesso!');
  } catch (error) {
    alert('Erro ao deletar item: ' + error.message);
  } finally {
    setLoading?.(false);
  }
};