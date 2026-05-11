import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Items() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({title: "",description: "",price: "",image: "",});

  const loadItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/item/getAllItems",
      );
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // ================= LOGOUT =================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // ================= CREATE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createItem = async (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.image.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/item/createItem",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFormData({title: "",description: "",price: "",image: "",});

      loadItems();
    } catch (error) {
      console.log("The error is: ", error);
    }
  };

  // ================= DELETE =================

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/item/deleteItem/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      loadItems();
    } catch (error) {
      console.log("The error is: ", error);
    }
  };

  // ================= UPDATE =================

  const updateItem = async (id) => {
    const title = prompt("Enter New Title");
    const description = prompt("Enter New Description");
    const price = prompt("Enter New Price");
    const image = prompt("Enter New Image URL");

    if (!title) return;

    try {
      await axios.put(
        `http://localhost:8000/api/v1/item/updateItem/${id}`,
        { title, description, price, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      loadItems();
    } catch (error) {
      console.log("The error is: ", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}

      <div className="bg-black text-white p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Items Page</h1>
        <div className="space-x-5">
          {user && <span>Hi {user.name}</span>}
          {user && (
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded cursor-pointer">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Admin Form */}

      {user?.role === "admin" && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-8">
          <h2 className="text-2xl font-bold mb-4">Create Item</h2>

          <form onSubmit={createItem} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <button className="bg-black text-white px-5 py-3 rounded cursor-pointer disabled:bg-gray-400" disabled={!formData.title || !formData.description || !formData.price || !formData.image}>
              Create
            </button>
          </form>
        </div>
      )}

      {/* Items */}

      <div className="max-w-2xl mx-auto mt-10 space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded shadow flex flex-col justify-center items-center"
          >
            <div>
              <h2 className="text-xl font-bold">{item.title}</h2>

              <p>{item.description}</p>

              <p className="font-bold mt-2">${item.price}</p>
              <img
                src={item.image}
                alt={item.title}
                className="mt-4 w-full h-64 object-cover"
              />
            </div>

            {user?.role === "admin" && (
              <div className="space-x-4 mt-4">
                <button
                  onClick={() => updateItem(item._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
