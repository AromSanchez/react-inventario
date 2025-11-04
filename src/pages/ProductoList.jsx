import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos, deleteProducto } from '../api';

function ProductoList() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        loadProductos();
    }, []);

    const loadProductos = async () => {
        try {
            const response = await getProductos();
            setProductos(response.data);
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await deleteProducto(id);
                loadProductos();
            } catch (error) {
                console.error('Error eliminando producto:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Gestión de Productos</h2>
                        <p className="text-gray-600 mt-2">Administra el inventario de productos</p>
                    </div>
                    <Link 
                        to="/productos/nuevo"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
                    >
                        + Crear Nuevo Producto
                    </Link>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Marca
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Categoría
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Precio
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {productos.map(producto => (
                                    <tr 
                                        key={producto.id} 
                                        className="hover:bg-gray-50 transition duration-150"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {producto.nombre}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">
                                                {producto.marca}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {producto.categoria}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-green-600">
                                                S/{producto.precio}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`text-sm font-medium ${
                                                producto.stock > 10 ? 'text-green-600' : 
                                                producto.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                                            }`}>
                                                {producto.stock} unidades
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-3">
                                                <Link 
                                                    to={`/productos/editar/${producto.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 font-semibold transition duration-200"
                                                >
                                                    Editar
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(producto.id)}
                                                    className="text-red-600 hover:text-red-900 font-semibold transition duration-200"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Empty State */}
                    {productos.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📦</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
                            <p className="text-gray-500 mb-4">Comienza agregando tu primer producto al inventario</p>
                            <Link 
                                to="/productos/nuevo"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Crear Primer Producto
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductoList;