import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategoria } from '../api';

function CategoriaForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        imagen: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'imagen') {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                imagen: file
            });
            // Crear preview de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategoria(formData);
            navigate('/categorias');
        } catch (error) {
            console.error('Error creando categoría:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear Nueva Categoría</h2>
                    <p className="text-gray-600">Agrega una nueva categoría para organizar tus productos</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre de la Categoría
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                placeholder="Ej: Electrónicos, Ropa, Hogar..."
                            />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descripción
                            </label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 resize-none"
                                placeholder="Describe la categoría..."
                            />
                        </div>

                        {/* Imagen Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Imagen de la Categoría
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 10MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        name="imagen"
                                        accept="image/*"
                                        onChange={handleChange}
                                        required
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Vista Previa */}
                        {previewImage && (
                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Vista previa:</h4>
                                <div className="flex justify-center">
                                    <img 
                                        src={previewImage} 
                                        alt="Preview" 
                                        className="max-w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="submit"
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
                            >
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Crear Categoría
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/categorias')}
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
                        La imagen ayudará a identificar fácilmente la categoría en el catálogo.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CategoriaForm;