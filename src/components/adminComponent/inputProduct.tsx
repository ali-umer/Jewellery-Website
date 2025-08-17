"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiDollarSign, FiPercent, FiType } from 'react-icons/fi';
import { InputStringField } from '@/components/adminComponent/inputString';
import { InputNumberField } from '@/components/adminComponent/inputNumber';
import { useAddProduct } from '@/hooks/Backend/use-Product-Insert';
import ProductColorManager from "@/components/adminComponent/colorParent";

export default function ProductForm() {
  const [formData, setFormData] = useState({ 
    name: "", 
    description: "", 
    price: "" as number | "", 
    discount: "" as number | "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdProductId, setCreatedProductId] = useState<number | null>(null);
  const { addProduct, insertColorsWithImages, loading, error } = useAddProduct();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: e.target.type === "number" ? (value ? Number(value) : "") : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    try {
      const productId = await addProduct({
        name: formData.name,
        description: formData.description,
        categoryName: "Necklace",
        price: formData.price || 0,
        discount: formData.discount || 0
      });

      setCreatedProductId(productId);
      setSuccess(true);
    } catch (err) {
      console.error("Failed to add product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-xl shadow-lg">
      <motion.h2 
        className="text-2xl font-bold text-yellow-500 mb-6" 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        Add Product
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputStringField 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          label="Product Name" 
          placeholder="Enter product name" 
          required 
          icon={<FiType />} 
        />
        
        <InputStringField 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          label="Description" 
          placeholder="Enter description" 
          required 
          isTextarea 
        />

        <div className="grid grid-cols-2 gap-4">
          <InputNumberField 
            id="price" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            label="Price ($)" 
            placeholder="0.00" 
            required 
            min={0} 
            step={0.01} 
            icon={<FiDollarSign />} 
          />
          <InputNumberField 
            id="discount" 
            name="discount" 
            value={formData.discount} 
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
          disabled={isSubmitting || loading}
          whileTap={{ scale: 0.95 }} 
          className={`w-full py-3 rounded-lg font-medium ${
            success ? "bg-emerald-600 text-white" : "bg-yellow-500 text-black"
          }`}
        >
          {isSubmitting || loading ? (
            "Processing..."
          ) : success ? (
            <span className="flex items-center">
              <FiCheck className="mr-2" /> Success!
            </span>
          ) : (
            <span className="flex items-center">
              Add Product <FiArrowRight className="ml-2" />
            </span>
          )}
        </motion.button>
      </form>

      {/* Show color/image manager only after successful product creation */}
      {success && createdProductId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h3 className="text-xl font-semibold text-yellow-500 mb-4">
            Add Variation
          </h3>
          <ProductColorManager 
            id={createdProductId} 
            submit={insertColorsWithImages} 
          />
        </motion.div>
      )}
    </div>
  );
}