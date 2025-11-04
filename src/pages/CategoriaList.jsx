import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategorias, deleteCategoria, BASE_URL } from '../api';

function CategoriaList() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        loadCategorias();
    }, []);

    const loadCategorias = async () => {
        try {
            const response = await getCategorias();
            setCategorias(response.data);
        } catch (error) {
            console.error('Error cargando categorías:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            try {
                await deleteCategoria(id);
                loadCategorias();
            } catch (error) {
                console.error('Error eliminando categoría:', error);
                if (error.response?.status === 400) {
                    alert('No se puede eliminar una categoría que tiene productos asociados');
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Categorías</h2>
                        <p className="text-gray-600 mt-2">Gestiona las categorías de productos</p>
                    </div>
                    <Link 
                        to="/categorias/nueva"
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
                    >
                        + Nueva Categoría
                    </Link>
                </div>

                {/* Grid de Categorías */}
                {categorias.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categorias.map(categoria => (
                            <div 
                                key={categoria.id} 
                                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300"
                            >
                                {/* Imagen de la categoría */}
                                {categoria.imagen && (
                                    <div className="h-48 overflow-hidden">
                                        <img 
                                            src={categoria.imagen.startsWith('http') ? categoria.imagen : `${BASE_URL}${categoria.imagen}`}
                                            alt={categoria.nombre}
                                            className="w-full h-full object-cover transition duration-300 hover:scale-105"
                                        />
                                    </div>
                                )}
                                
                                {/* Contenido */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {categoria.nombre}
                                    </h3>
                                    
                                    {categoria.descripcion && (
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {categoria.descripcion}
                                        </p>
                                    )}

                                    {/* Acciones */}
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <Link 
                                            to={`/categorias/editar/${categoria.id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 flex items-center"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Editar
                                        </Link>
                                        
                                        <button 
                                            onClick={() => handleDelete(categoria.id)}
                                            className="text-red-600 hover:text-red-800 font-medium transition duration-200 flex items-center"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Estado vacío */
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                        <div className="text-gray-400 text-6xl mb-4">📂</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No hay categorías</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Comienza creando tu primera categoría para organizar mejor tus productos.
                        </p>
                        <Link 
                            to="/categorias/nueva"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Crear Primera Categoría
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoriaList;