import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducto, updateProducto, getCategorias } from '../api';

function ProductoEdit() {
    const { id } = useParams();
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
        loadProducto();
        loadCategorias();
    }, [id]);

    const loadProducto = async () => {
        try {
            const response = await getProducto(id);
            setFormData(response.data);
        } catch (error) {
            console.error('Error cargando producto:', error);
        }
    };

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
            await updateProducto(id, formData);
            navigate('/productos');
        } catch (error) {
            console.error('Error actualizando producto:', error);
        }
    };

    return (
        <div>
            <h2>Editar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Marca:</label>
                    <input
                        type="text"
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </div>
                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
}

export default ProductoEdit;