import { useEffect, useState } from "react";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import baseUrl from '../hooks/useBaseUrl';

const Land = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    category: "",
    price_range: "100000",
    sort_order: "",
  })
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10)

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


  useEffect(() => {
    baseUrl.get(`/products?search=${filter?.search}&&brand_name=${brandName}&&category=${filter?.category}&&price_range=${filter?.price_range}&&sort_order=${filter?.sort_order}&&current_page=${currentPage}`)
    .then((response) => response.data)
    .then((data) => {
      setProducts(data.result)
      setTotalPage(data.totalPage)
    })
    .catch((error) => console.log(error))
  },[filter, brandName, currentPage])

  // console.log(products)

  return (
    <div className="">
      {/* Filter section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div 
          onClick={() => setOpen(!open)} 
          className="w-full flex items-center justify-between p-5 border-b border-gray-300 cursor-pointer bg-slate-300"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Filter</h2>
          {open ? (
            <CiMenuFries className="text-2xl text-gray-700" />
          ) : (
            <CiMenuBurger className="text-2xl text-gray-700" />
          )}
        </div>

        {open && (
          <div className="p-5 flex lg:flex-row flex-col items-center justify-between space-y-4">
            <input 
              type="text" 
              onChange={(e) => setFilter({...filter, search: e.target.value})}
              placeholder="Search here" 
              className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select 
              onChange={(e) => setBrandName(e.target.value)}
              className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Brand</option>
              {data?.map(item => (
                <option key={item.brand_name} value={item.brand_name}>{item.brand_name}</option>
              ))}
            </select>

            <select 
              className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFilter({...filter, category: e.target.value})}
            >
              <option value="">Select Category</option>
              {categories?.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select 
              onChange={(e) => setFilter({...filter, sort_order: e.target.value})}
              className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sort order</option>
              <option value="low_to_high">Low to high</option>
              <option value="high_to_low">High to low</option>
              <option value="newest_date">Newest date</option>
            </select>

            <div className="flex items-center">
              <span className="mr-2 text-gray-600 ">Price Range: 0 to {filter.price_range}</span>
              <input 
                type="range"
                min="500"
                max="100000"
                step="500"
                className="w-48"
                onChange={(e) => setFilter({...filter, price_range: e.target.value})}
              />
            </div>
          </div>
        )}
      </div>

      {/* Products section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products?.map(product => (
          <div key={product?.id} className=" p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
              <img src={product?.image} alt={product?.ProductName} className="w-full md:h-64 h-44 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product?.productName}</h3>
                <h4 className="text-lg mt-2">Brand: {product?.brandName}</h4>
                <h4 className="text-lg mb-2">Category: {product?.category}</h4>
                <h1 className="text-gray-600">Price: ${product?.price}</h1>
                <h1 className="text-gray-600">Rating: {product?.rating || 5}</h1>
                <span className="text-gray-600">{product?.details}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-5 items-center justify-end my-10">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="bg-blue-300 px-3 py-1 hover:bg-white hover:border border-black">Previous</button>
        {currentPage}
        <button disabled={currentPage === totalPage} onClick={() => setCurrentPage(currentPage + 1)} className="bg-blue-300 px-3 py-1 hover:bg-white hover:border border-black">Next</button>
      </div>
    </div>
  );
};

export default Land;
