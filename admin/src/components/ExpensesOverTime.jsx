'use client';
import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { expenseOverTime } from "../redux /actions/expenseActions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesOverTime = () => {
  const { expenseovertime } = useSelector((state) => state.expense);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(expenseOverTime());
  }, [dispatch]);

  // Prepare month labels (Jan - Dec)
  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Initialize array with 0s for all 12 months
  const monthlyData = Array(12).fill(0);

  // Fill in totalAmount by month
  expenseovertime?.forEach((item) => {
    if (item.month >= 1 && item.month <= 12) {
      monthlyData[item.month - 1] += item.totalAmount;
    }
  });

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: "Total Expenses (Monthly)",
        data: monthlyData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Expenses Over Time (Monthly View)",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Amount",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  return (
    <div className="mx-auto p-4 w-full max-w-7xl">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpensesOverTime;
