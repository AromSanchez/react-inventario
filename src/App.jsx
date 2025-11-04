import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductoList from './pages/ProductoList';
import ProductoForm from './pages/ProductoForm';
import ProductoEdit from './pages/ProductoEdit';
import CategoriaList from './pages/CategoriaList';
import CategoriaForm from './pages/CategoriaForm';
import CategoriaEdit from './pages/CategoriaEdit';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-800">📦 Sistema de Inventario</h1>
              </div>
              
              <ul className="flex space-x-8">
                <li>
                  <Link 
                    to="/productos" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition duration-200 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Productos
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/categorias" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition duration-200 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Categorías
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/productos" element={<ProductoList />} />
            <Route path="/productos/nuevo" element={<ProductoForm />} />
            <Route path="/productos/editar/:id" element={<ProductoEdit />} />
            <Route path="/categorias" element={<CategoriaList />} />
            <Route path="/categorias/nueva" element={<CategoriaForm />} />
            <Route path="/categorias/editar/:id" element={<CategoriaEdit />} />
            <Route path="/" element={<ProductoList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;