import React, { useEffect, useState } from 'react';
import Header from './components/HeaderMain';
import { useNavigate } from 'react-router-dom';

interface HomePage {
    path: string;
}

const Home: React.FC<HomePage> = ({ path }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/products');
                const jsonData = await response.json();
                setProducts(jsonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="w-full bg-white">
            <Header />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        products.map((product) => (
                            <a key={product.id} href={product.href} className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={product.image}
                                        alt={product.description}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        onClick={() => navigate('/login')}
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}$</p>
                                <button
                                    onClick={() => navigate('/login')} 
                                    className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
                                >
                                    Buy?
                                </button>
                            </a>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
