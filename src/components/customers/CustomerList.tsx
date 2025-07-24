import React from "react";
import { CustomerDto } from "../../types";
import { Button, LoadingSpinner, Card } from "../ui";
import { Edit, Trash2, User } from "lucide-react";

interface CustomerListProps {
  customers: CustomerDto[];
  loading?: boolean;
  onEdit?: (customer: CustomerDto) => void;
  onDelete?: (id: number) => void;
  onSelect?: (customer: CustomerDto) => void;
  showActions?: boolean;
  emptyMessage?: string;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  loading = false,
  onEdit,
  onDelete,
  onSelect,
  showActions = true,
  emptyMessage = "No customers found.",
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">{emptyMessage}</div>
        <p className="text-gray-400">Create a new customer to get started.</p>
      </Card>
    );
  }

  return (
    <Card padding="sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Customer
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Email
              </th>
              {showActions && (
                <th className="text-right py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className={`border-b border-gray-100 hover:bg-gray-50 ${
                  onSelect ? "cursor-pointer" : ""
                }`}
                onClick={onSelect ? () => onSelect(customer) : undefined}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {customer.name}
                      </div>
                      {customer.id && (
                        <div className="text-sm text-gray-500">
                          ID: {customer.id}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {customer.email || "No email provided"}
                </td>
                {showActions && (
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(customer);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      {onDelete && customer.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(customer.id!);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CustomerList;
