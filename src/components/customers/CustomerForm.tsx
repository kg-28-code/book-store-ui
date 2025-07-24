import React, { useState, useEffect } from "react";
import { CustomerDto, FormErrors } from "../../types";
import { validateRequired, validateEmail } from "../../utils/validation";
import { Input, Button } from "../ui";

interface CustomerFormProps {
  customer?: CustomerDto | null;
  onSubmit: (customer: Omit<CustomerDto, "id">) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
      });
    }
  }, [customer]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = "Name is required";
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const customerData: Omit<CustomerDto, "id"> = {
      name: formData.name,
      email: formData.email || undefined,
    };

    try {
      await onSubmit(customerData);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder="Enter customer name"
      />

      <Input
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter email address"
        helperText="Optional - used for order notifications"
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" loading={loading} className="flex-1">
          {customer ? "Update Customer" : "Create Customer"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
