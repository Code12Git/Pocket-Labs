import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "../redux /actions/expenseActions";

const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return {
        icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
        badgeColor: "bg-green-500",
        bgColor: "bg-green-100 text-green-600",
      };
    case "rejected":
      return {
        icon: <XCircleIcon className="h-5 w-5 text-red-500" />,
        badgeColor: "bg-red-500",
        bgColor: "bg-red-100 text-red-600",
      };
    case "pending":
    default:
      return {
        icon: <ClockIcon className="h-5 w-5 text-yellow-500" />,
        badgeColor: "bg-yellow-500",
        bgColor: "bg-yellow-100 text-yellow-600",
      };
  }
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Expenses = ({ expense }) => {
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const statusInfo = getStatusColor(expense?.status || "pending");
  const dispatch = useDispatch()

  const handleStatusChange = (newStatus) => {
    console.log(newStatus)
    dispatch(changeStatus(expense._id,newStatus))
    setShowStatusOptions(false);
  };

  const statusOptions = [
    { value: "pending", icon: <ClockIcon className="h-4 w-4 text-yellow-500" />, label: "Pending" },
    { value: "approved", icon: <CheckCircleIcon className="h-4 w-4 text-green-500" />, label: "Approve" },
    { value: "rejected", icon: <XCircleIcon className="h-4 w-4 text-red-500" />, label: "Reject" },
  ];

  return (
    <div className="bg-gray-50">
      {/* Expense Card */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 relative"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-800 capitalize">
                {expense?.category || "No Category"}
              </h3>
              <p className="text-sm text-gray-500">
                ₹{expense?.amount} • {formatDate(expense?.date)}
              </p>
              <p className="text-sm text-gray-400 mt-1">{expense?.notes}</p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setShowStatusOptions(!showStatusOptions)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <PencilSquareIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${statusInfo.badgeColor}`} />
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusInfo.bgColor}`}
              >
                {expense?.status || "pending"}
              </span>
            </div>

            {showStatusOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-1 bg-white p-1 rounded-lg shadow-md absolute right-4 bottom-12"
              >
                {statusOptions
                  .filter(option => option.value !== expense?.status)
                  .map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusChange(option.value)}
                      className="p-2 flex items-center gap-1 text-xs hover:bg-gray-100 rounded"
                      title={option.label}
                    >
                      {option.icon}
                      <span className="hidden sm:inline">{option.label}</span>
                    </motion.button>
                  ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Expenses;