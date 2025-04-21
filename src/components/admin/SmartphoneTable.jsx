const SmartphoneTable = ({ smartphones, onEdit, onDelete }) => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">Nama</th>
                    <th className="p-2 border">Merek</th>
                    <th className="p-2 border">Harga</th>
                    <th className="p-2 border">Stok</th>
                    <th className="p-2 border">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {smartphones.map((item) => (
                    <tr key={item.id} className="text-center">
                        <td className="border p-2">{item.nama}</td>
                        <td className="border p-2">{item.merek}</td>
                        <td className="border p-2">{item.harga}</td>
                        <td className="border p-2">{item.stok}</td>
                        <td className="border p-2">
                            <button className="text-blue-500 mr-2" onClick={() => onEdit(item)}>Edit</button>
                            <button className="text-red-500" onClick={() => onDelete(item.id)}>Hapus</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SmartphoneTable;
