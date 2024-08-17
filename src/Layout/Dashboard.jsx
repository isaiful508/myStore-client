import { useEffect, useState } from "react";
import useSecureUrl from "./../hooks/useSecureUrl"
import toast from "react-hot-toast";
import Loading from "./../components/Loading"

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [categories, setCategories] = useState([]);
    const secureBaseUrl = useSecureUrl();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/data.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()).then(result => {
            setData(result);
        });
    }, []);

    useEffect(() => {
        const selectedBrand = data.find(item => item.brand_name === brandName);
        if (selectedBrand) {
            setCategories(selectedBrand.categories);
        } else {
            setCategories([]);
        }
    }, [brandName, data]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setLoading(true)

        const productName = e.target.productName.value;
        const brandName = e.target.brandName.value;
        const category = e.target.category.value;
        const price = Number(e.target.price.value);
        const details = e.target.details.value;
        const image = e.target.image.value
        const date = Date.now()

        const newProduct = {
            productName,
            brandName,
            category,
            price,
            details,
            image,
            date,
        };

        try {
            const res = await secureBaseUrl.post('/products', newProduct)
            console.log(res.data);
            if(res.data.acknowledged){
                toast.success('Product updated successfully')
                e.target.reset();
            }
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input required id="productName" name="productName"
                            type="text"
                            placeholder="Enter product name"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Brand</label>
                        <select required id="brandName" name="brandName"
                            onChange={(e) => setBrandName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a brand</option>
                            {data.map((item, i) => (
                                <option key={i} value={item.brand_name}>
                                    {item.brand_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select required id="category" name="category"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category, i) => (
                                <option key={i} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input required id="image" name="image"
                            type="text"
                            placeholder="Enter product image url"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input required id="price" name="price"
                            type="number"
                            placeholder="Enter product price"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input required id="rating" name="rating"
                            type="number"
                            placeholder="Enter product rating"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Details</label>
                        <textarea required id="details" name="details"
                            placeholder="Enter product details"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        {!loading ? <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button> : <Loading />}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
