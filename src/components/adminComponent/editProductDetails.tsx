"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiDollarSign, FiPercent, FiType } from "react-icons/fi";
import { InputStringField } from "@/components/adminComponent/inputString";
import { InputNumberField } from "@/components/adminComponent/inputNumber";
import { useEditProduct } from "@/hooks/Backend/use-Edit-Product";

interface EditProductFormProps {
  productId: number;
}

export default function EditProductForm({ productId }: EditProductFormProps) {
  const { product, getProduct, updateProduct, loading, error } = useEditProduct();

  const [formData, setFormData] = useState<{
    Name: string;
    Description: string;
    Price: number | "";
    Discount: number | "";
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch product and only set form once
  useEffect(() => {
    (async () => {
      const data = await getProduct(productId);
      if (data) {
        setFormData({
          Name: data.Name,
          Description: data.Description,
          Price: data.Price,
          Discount: data.Discount,
        });
      }
    })();
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev =>
      prev
        ? {
            ...prev,
            [name]: type === "number" ? (value ? Number(value) : "") : value,
          }
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !formData) return;

    setIsSubmitting(true);
    setSuccess(false);

    try {
      const updatedFields: any = {};
      Object.keys(formData).forEach((key) => {
        if ((formData as any)[key] !== (product as any)[key]) {
          updatedFields[key] = (formData as any)[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        console.log("No changes detected");
        setIsSubmitting(false);
        return;
      }

      const ok = await updateProduct(product.id, updatedFields);
      if (ok) setSuccess(true);
    } catch (err) {
      console.error("Failed to update product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 👉 Conditional rendering to avoid mounting empty form
  if (loading && !formData) return <p className="text-gray-400">Fetching product data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!formData) return <p className="text-gray-400">No product found.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-xl shadow-lg">
      <motion.h2
        className="text-2xl font-bold text-yellow-500 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Edit Product
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputStringField
          id="Name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          label="Product Name"
          placeholder="Enter product name"
          required
          icon={<FiType />}
        />

        <InputStringField
          id="Description"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          label="Description"
          placeholder="Enter description"
          required
          isTextarea
        />

        <div className="grid grid-cols-2 gap-4">
          <InputNumberField
            id="Price"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            label="Price ($)"
            placeholder="0.00"
            required
            min={0}
            step={0.01}
            icon={<FiDollarSign />}
          />
          <InputNumberField
            id="Discount"
            name="Discount"
            value={formData.Discount}
            onChange={handleChange}
            label="Discount (%)"
            placeholder="0"
            min={0}
            max={100}
            icon={<FiPercent />}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-lg font-medium ${
            success ? "bg-emerald-600 text-white" : "bg-yellow-500 text-black"
          }`}
        >
          {isSubmitting ? "Processing..." : success ? (
            <span className="flex items-center">
              <FiCheck className="mr-2" /> Updated!
            </span>
          ) : (
            <span className="flex items-center">
              Update Product <FiArrowRight className="ml-2" />
            </span>
          )}
        </motion.button>
      </form>
    </div>
  );
}
