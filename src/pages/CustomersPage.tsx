import React, { useState, useEffect } from "react";
import { CustomerList, CustomerForm } from "../components/customers";
import { Button, Modal, Input } from "../components/ui";
import { useCustomers } from "../contexts";
import { CustomerDto } from "../types";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";

const CustomersPage: React.FC = () => {
  const {
    state,
    loadCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const filteredCustomers = state.customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.email &&
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateCustomer = async (
    customerData: Omit<CustomerDto, "id">
  ) => {
    try {
      await createCustomer(customerData);
      setIsCreateModalOpen(false);
      toast.success("Customer created successfully!");
    } catch (error) {
      toast.error("Failed to create customer");
    }
  };

  const handleUpdateCustomer = async (
    customerData: Omit<CustomerDto, "id">
  ) => {
    if (!selectedCustomer?.id) return;

    try {
      await updateCustomer(selectedCustomer.id, customerData);
      setIsEditModalOpen(false);
      setSelectedCustomer(null);
      toast.success("Customer updated successfully!");
    } catch (error) {
      toast.error("Failed to update customer");
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      await deleteCustomer(id);
      toast.success("Customer deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete customer");
    }
  };

  const handleEditCustomer = (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer database</p>
        </div>

        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search customers by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {state.customers.length}
          </div>
          <div className="text-sm text-gray-600">Total Customers</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {filteredCustomers.length}
          </div>
          <div className="text-sm text-gray-600">Filtered Results</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {state.customers.filter((customer) => customer.email).length}
          </div>
          <div className="text-sm text-gray-600">With Email</div>
        </div>
      </div>

      {/* Customer List */}
      <CustomerList
        customers={filteredCustomers}
        loading={state.isLoading}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
        showActions={true}
        emptyMessage={
          searchQuery
            ? "No customers match your search."
            : "No customers found."
        }
      />

      {/* Create Customer Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Customer"
        size="md"
      >
        <CustomerForm
          onSubmit={handleCreateCustomer}
          onCancel={() => setIsCreateModalOpen(false)}
          loading={state.isLoading}
        />
      </Modal>

      {/* Edit Customer Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCustomer(null);
        }}
        title="Edit Customer"
        size="md"
      >
        <CustomerForm
          customer={selectedCustomer}
          onSubmit={handleUpdateCustomer}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedCustomer(null);
          }}
          loading={state.isLoading}
        />
      </Modal>
    </div>
  );
};

export default CustomersPage;
