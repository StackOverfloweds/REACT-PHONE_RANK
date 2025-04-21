import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteSmartphone } from "../../../api/admin";

const DeleteSmartphone = () => {
  const { id } = useParams();

  useEffect(() => {
    const confirmAndDelete = async () => {
      const confirmed = window.confirm("Are you sure you want to delete this smartphone?");
      if (!confirmed) {
        window.location.href = "/admin/phones";
        return;
      }

      try {
        await deleteSmartphone(id);
        window.location.href = "/admin/phones";
      } catch (err) {
        console.error("Failed to delete smartphone:", err);
      }
    };

    confirmAndDelete();
  }, [id]);

  return null;
};

export default DeleteSmartphone;
