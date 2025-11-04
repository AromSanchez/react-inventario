import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto, getCategorias } from '../api';

function ProductoForm() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        marca: '',
        categoria: '',
        precio: '',
        stock: ''
    });

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProducto(formData);
            navigate('/productos');
        } catch (error) {
            console.error('Error creando producto:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Producto</h2>
                    <p className="text-gray-600">Completa la información del producto</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del Producto
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Ingresa el nombre del producto"
                            />
                        </div>

                        {/* Marca */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Marca
                            </label>
                            <input
                                type="text"
                                name="marca"
                                value={formData.marca}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Ingresa la marca del producto"
                            />
                        </div>

                        {/* Categoría */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categoría
                            </label>
                            <select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            >
                                <option value="">Selecciona una categoría</option>
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Precio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Precio
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        S/
                                    </span>
                                    <input
                                        type="number"
                                        name="precio"
                                        value={formData.precio}
                                        onChange={handleChange}
                                        step="0.01"
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        placeholder="0.00"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
                            >
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Guardar Producto
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/productos')}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>

                {/* Información adicional */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Todos los campos son obligatorios. Asegúrate de que la información sea correcta.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductoForm;