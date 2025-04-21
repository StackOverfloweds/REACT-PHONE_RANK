import { useState, useEffect } from "react";

const SmartphoneFormModal = ({ onClose, onSubmit, initialData }) => {
    const [form, setForm] = useState({
        nama: "",
        merek: "",
        harga: "",
        stok: ""
    });

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">
                    {initialData ? "Edit Smartphone" : "Tambah Smartphone"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="nama" placeholder="Nama" value={form.nama} onChange={handleChange} className="w-full mb-2 p-2 border" />
                    <input type="text" name="merek" placeholder="Merek" value={form.merek} onChange={handleChange} className="w-full mb-2 p-2 border" />
                    <input type="number" name="harga" placeholder="Harga" value={form.harga} onChange={handleChange} className="w-full mb-2 p-2 border" />
                    <input type="number" name="stok" placeholder="Stok" value={form.stok} onChange={handleChange} className="w-full mb-4 p-2 border" />

                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Batal</button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                            {initialData ? "Simpan" : "Tambah"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SmartphoneFormModal;
