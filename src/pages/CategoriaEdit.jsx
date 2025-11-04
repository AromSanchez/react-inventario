import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoria, updateCategoria, BASE_URL } from '../api';

function CategoriaEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        imagen: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadCategoria();
    }, [id]);

    const loadCategoria = async () => {
        try {
            const response = await getCategoria(id);
            setFormData({
                nombre: response.data.nombre,
                descripcion: response.data.descripcion,
            });
            setCurrentImage(response.data.imagen);
        } catch (error) {
            console.error('Error cargando categoría:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
            await updateCategoria(id, formData);
            navigate('/categorias');
        } catch (error) {
            console.error('Error actualizando categoría:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando categoría...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Editar Categoría</h2>
                    <p className="text-gray-600">Actualiza la información de la categoría</p>
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
                                            <span className="font-semibold">Haz clic para cambiar la imagen</span>
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 10MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        name="imagen"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Vista Previa */}
                        {(previewImage || currentImage) && (
                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">
                                    {previewImage ? 'Nueva imagen:' : 'Imagen actual:'}
                                </h4>
                                <div className="flex justify-center">
                                    <img 
                                        src={previewImage || (currentImage?.startsWith('http') ? currentImage : `${BASE_URL}${currentImage}`)}
                                        alt="Preview"
                                        className="max-w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                                {previewImage && (
                                    <p className="text-xs text-green-600 text-center mt-2">
                                        ✅ Vista previa de la nueva imagen
                                    </p>
                                )}
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
                                    Actualizar Categoría
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
                        Deja el campo de imagen vacío si no deseas cambiarla.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CategoriaEdit;